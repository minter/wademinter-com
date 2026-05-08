import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, extname, join } from 'path';
import { execFileSync } from 'child_process';
import { appleMusicConfig, appleMusicFetch } from './apple-music.mjs';

const BLOG_DIR = join(import.meta.dirname, '..', 'src', 'content', 'blog');
const PLAYLIST_IMAGE_DIR = join(import.meta.dirname, '..', 'public', 'images', 'blog', 'playlists');
const PUBLIC_DIR = join(import.meta.dirname, '..', 'public');
const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');
const noAi = args.includes('--no-ai');
const noMusicCover = args.includes('--no-music-cover');
const noSongArtwork = args.includes('--no-song-artwork');
const model = optionValue('--model') || process.env.OPENAI_MODEL || 'gpt-5.4-mini';
const coverImage = optionValue('--cover-image');
const inputPath = positionalArgs()[0];

if (!inputPath) {
  console.error('Usage: bin/playlist-post <playlist-export.txt> [--dry-run] [--force] [--no-ai] [--no-music-cover] [--no-song-artwork] [--model <model>] [--cover-image <image>]');
  process.exit(1);
}

const playlistInfo = parsePlaylistFilename(inputPath);
const tracks = await enrichTracksWithSongArtwork(parseAppleMusicExport(inputPath));
const musicCover = await findMusicCover(playlistInfo);
const featuredImage = coverImage
  ? playlistImagePath(playlistInfo, coverImage)
  : (musicCover?.featuredImage || '');

if (tracks.length === 0) {
  console.error(`No tracks found in ${inputPath}`);
  process.exit(1);
}

const markdown = await buildMarkdown(playlistInfo, tracks, featuredImage);
const outputPath = join(BLOG_DIR, `${playlistInfo.slug}.md`);

if (dryRun) {
  console.log(markdown);
} else {
  if (existsSync(outputPath) && !force) {
    console.error(`Refusing to overwrite existing post: ${outputPath}`);
    console.error('Run again with --force to replace it.');
    process.exit(1);
  }

  if (coverImage) {
    const targetPath = join(PUBLIC_DIR, featuredImage);
    if (existsSync(targetPath) && !force) {
      console.error(`Refusing to overwrite existing cover image: ${targetPath}`);
      console.error('Run again with --force to replace it.');
      process.exit(1);
    }

    mkdirSync(PLAYLIST_IMAGE_DIR, { recursive: true });
    copyFileSync(coverImage, targetPath);
  } else if (musicCover) {
    const targetPath = join(PUBLIC_DIR, musicCover.featuredImage);
    if (existsSync(targetPath) && !force) {
      console.error(`Refusing to overwrite existing cover image: ${targetPath}`);
      console.error('Run again with --force to replace it.');
      process.exit(1);
    }

    mkdirSync(PLAYLIST_IMAGE_DIR, { recursive: true });
    writeFileSync(targetPath, musicCover.bytes);
  }

  mkdirSync(BLOG_DIR, { recursive: true });
  writeFileSync(outputPath, markdown);
  console.log(`Created ${outputPath}`);
}

function parseAppleMusicExport(path) {
  const raw = readFileSync(path);
  const text = decodeAppleMusicText(raw);
  const rows = text
    .replace(/^\uFEFF/, '')
    .split(/\r\n|\r|\n/)
    .filter(Boolean)
    .map(row => row.split('\t'));

  const headers = rows.shift();
  if (!headers) return [];

  const index = new Map(headers.map((header, i) => [header, i]));

  return rows.map(row => ({
    name: value(row, index, 'Name'),
    artist: value(row, index, 'Artist'),
    album: value(row, index, 'Album'),
    genre: value(row, index, 'Genre'),
    year: value(row, index, 'Year'),
    time: Number(value(row, index, 'Time')) || 0,
  })).filter(track => track.name && track.artist);
}

function decodeAppleMusicText(raw) {
  if (raw[0] === 0xff && raw[1] === 0xfe) {
    return new TextDecoder('utf-16le').decode(raw);
  }

  if (raw[0] === 0xfe && raw[1] === 0xff) {
    return new TextDecoder('utf-16be').decode(raw);
  }

  return raw.toString('utf8');
}

function value(row, index, key) {
  const fieldIndex = index.get(key);
  return fieldIndex === undefined ? '' : (row[fieldIndex] ?? '').trim();
}

function parsePlaylistFilename(path) {
  const fileBase = basename(path).replace(/\.[^.]+$/, '');
  const match = fileBase.match(/^(.*?)\s*-\s*([A-Za-z]+)\s+(\d{4})$/);

  if (!match) {
    console.error('Expected filename format like "For The Girls - April 2026.txt"');
    process.exit(1);
  }

  const [, rawName, rawMonth, rawYear] = match;
  const monthIndex = MONTHS.indexOf(rawMonth.toLowerCase());
  if (monthIndex === -1) {
    console.error(`Could not parse month from ${path}`);
    process.exit(1);
  }

  const year = Number(rawYear);
  const date = new Date(Date.UTC(year, monthIndex, 15));
  const month = titleCase(rawMonth);
  const playlistName = titleCase(rawName);
  const sourceName = `${rawName.trim()} - ${month} ${year}`;
  const slug = `${date.toISOString().slice(0, 10)}-${slugify(`${rawName}-${month}-${year}`)}`;

  return {
    playlistName,
    sourceName,
    month,
    year,
    date: date.toISOString().slice(0, 10),
    slug,
    title: `${playlistName}: ${month} ${year}`,
  };
}

async function buildMarkdown(playlistInfo, tracks, featuredImage) {
  if (!noAi && process.env.OPENAI_API_KEY) {
    return await buildAiMarkdown(playlistInfo, tracks, featuredImage);
  }

  return buildTemplateMarkdown(playlistInfo, tracks, featuredImage);
}

function buildTemplateMarkdown(playlistInfo, tracks, featuredImage) {
  const totalSeconds = tracks.reduce((sum, track) => sum + track.time, 0);
  const years = tracks.map(track => Number(track.year)).filter(Boolean);
  const genres = unique(tracks.map(track => track.genre).filter(Boolean));
  const yearRange = years.length ? `${Math.min(...years)}-${Math.max(...years)}` : '';
  const notes = tracks.map(track => {
    const details = [track.album && `_${track.album}_`, track.year, track.genre]
      .filter(Boolean)
      .join(', ');
    return `${details}.`;
  });

  return `---
title: '${yamlSingleQuote(playlistInfo.title)}'
date: ${playlistInfo.date}
description: A monthly playlist for the girls, covering ${playlistInfo.month} ${playlistInfo.year}.
featured_image: '${featuredImage}'
---

This is the ${playlistInfo.month} ${playlistInfo.year} playlist for the girls.

It runs ${formatDuration(totalSeconds)} and spans ${yearRange}.

## The Songs

${formatTrackList(tracks, notes)}

## Genres

${genres.map(genre => `- ${genre}`).join('\n')}
`;
}

async function buildAiMarkdown(playlistInfo, tracks, featuredImage) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      instructions: [
        'You write blog posts for Wade Minter.',
        'The source data is an Apple Music playlist export for a monthly playlist Wade makes for his daughters.',
        'Return only valid JSON. Do not include Markdown, YAML frontmatter, or code fences.',
        'Use this schema: {"intro":"This is the MONTH YEAR playlist for the girls.","notes":["one note per track"]}.',
        'Keep the tone factual, concise, plainspoken, and lightly personal.',
        'Do not over-explain that the playlist is eclectic; that is the known premise.',
        'Do not invent facts about Wade, his daughters, the month, or the songs.',
        'Use the provided track order exactly.',
        'The intro must be exactly one factual sentence in this form: "This is the MONTH YEAR playlist for the girls."',
        'Write one concise factual note for each track.',
        'Good factual context can include release era, album, genre, songwriter, notable sound, chart/cultural context, or what kind of song it is.',
        'Avoid total track count, most-played notes, play counts, skip counts, and listening-history analysis.',
      ].join('\n'),
      input: JSON.stringify({
        playlist: playlistInfo,
        summary: playlistSummary(tracks),
        tracks,
      }, null, 2),
      max_output_tokens: 2500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const responseText = extractResponseText(data).trim();
  if (!responseText) {
    throw new Error('OpenAI response did not include text output.');
  }
  const generated = parseJsonResponse(responseText);
  const notes = Array.isArray(generated.notes) ? generated.notes : [];
  const body = renderBodyMarkdown(playlistInfo, tracks, generated.intro, notes);

  return `${frontmatter(playlistInfo, featuredImage)}\n${body}\n`;
}

function renderBodyMarkdown(playlistInfo, tracks, intro, notes) {
  const genres = unique(tracks.map(track => track.genre).filter(Boolean));
  const fallbackIntro = `This is the ${playlistInfo.month} ${playlistInfo.year} playlist for the girls.`;

  return `${intro || fallbackIntro}

## The Songs

${formatTrackList(tracks, notes)}

## Genres

${genres.map(genre => `- ${genre}`).join('\n')}`;
}

function frontmatter(playlistInfo, featuredImage) {
  return `---
title: '${yamlSingleQuote(playlistInfo.title)}'
date: ${playlistInfo.date}
description: A monthly playlist for the girls, covering ${playlistInfo.month} ${playlistInfo.year}.
featured_image: '${featuredImage}'
---
`;
}

function playlistSummary(tracks) {
  const totalSeconds = tracks.reduce((sum, track) => sum + track.time, 0);
  const years = tracks.map(track => Number(track.year)).filter(Boolean);
  const genres = unique(tracks.map(track => track.genre).filter(Boolean));

  return {
    runtime: formatDuration(totalSeconds),
    yearRange: years.length ? `${Math.min(...years)}-${Math.max(...years)}` : null,
    genres,
  };
}

function extractResponseText(data) {
  if (typeof data.output_text === 'string') {
    return data.output_text;
  }

  return (data.output || [])
    .flatMap(item => item.content || [])
    .map(content => content.text || '')
    .join('');
}

function parseJsonResponse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }

    throw new Error(`OpenAI response was not valid JSON: ${text}`);
  }
}

async function enrichTracksWithSongArtwork(tracks) {
  if (noSongArtwork) {
    return tracks;
  }

  try {
    appleMusicConfig();
  } catch {
    return tracks;
  }

  const enrichedTracks = [];

  for (const track of tracks) {
    await sleep(200);
    try {
      const artworkUrl = await findSongArtwork(track);
      enrichedTracks.push(artworkUrl ? {...track, artworkUrl} : track);
    } catch (error) {
      console.warn(`Could not fetch song artwork for ${track.name} - ${track.artist}: ${error.message}`);
      enrichedTracks.push(track);
    }
  }

  return enrichedTracks;
}

async function findSongArtwork(track) {
  const terms = [
    `${track.name} ${track.artist} ${track.album}`,
    `${track.name} ${track.artist}`,
  ];

  for (const term of terms) {
    const result = await appleMusicFetch(
      `/v1/catalog/${appleMusicConfig().storefront}/search?types=songs&limit=5&term=${encodeURIComponent(term)}`
    );
    const song = bestSongMatch(track, result.results?.songs?.data || []);
    const artworkUrl = song?.attributes?.artwork?.url;

    if (artworkUrl) {
      return artworkUrl.replace('{w}', '160').replace('{h}', '160');
    }
  }

  return undefined;
}

function bestSongMatch(track, songs) {
  const normalizedName = normalizeForMatch(track.name);
  const normalizedArtist = normalizeForMatch(track.artist);
  const normalizedAlbum = normalizeForMatch(track.album);

  return songs.find(song =>
    normalizeForMatch(song.attributes?.name) === normalizedName &&
    normalizeForMatch(song.attributes?.artistName) === normalizedArtist
  ) || songs.find(song =>
    normalizeForMatch(song.attributes?.name).includes(normalizedName) &&
    normalizeForMatch(song.attributes?.artistName).includes(normalizedArtist)
  ) || songs.find(song =>
    normalizedAlbum &&
    normalizeForMatch(song.attributes?.albumName) === normalizedAlbum
  ) || songs[0];
}

function formatTrackList(tracks, notes) {
  return `<div class="playlist-songs">
${tracks.map((track, index) => formatTrack(track, index, notes[index])).join('\n')}
</div>`;
}

function formatTrack(track, index, note) {
  const artwork = track.artworkUrl
    ? `<img class="playlist-song-artwork" src="${htmlEscape(track.artworkUrl)}" alt="${htmlEscape(track.album ? `Album cover for ${track.album}` : `Album artwork for ${track.name}`)}" width="72" height="72">`
    : '';
  const title = htmlEscape(`"${track.name}" - ${track.artist}`);
  const description = htmlEscape(note || fallbackTrackNote(track));

  return `  <article class="playlist-song">
    <span class="playlist-song-number">${index + 1}.</span>
    ${artwork}
    <div class="playlist-song-copy">
      <strong>${title}</strong>
      <p>${description}</p>
    </div>
  </article>`;
}

function fallbackTrackNote(track) {
  const details = [track.album, track.year, track.genre]
    .filter(Boolean)
    .join(', ');

  return `${details}.`;
}

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function titleCase(value) {
  return value
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && ['a', 'an', 'and', 'for', 'of', 'the', 'to'].includes(lower)) {
        return lower;
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function unique(values) {
  return [...new Set(values)];
}

function yamlSingleQuote(value) {
  return value.replace(/'/g, "''");
}

function htmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeForMatch(value = '') {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function optionValue(name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function positionalArgs() {
  const positional = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (['--cover-image', '--model'].includes(arg)) {
      i += 1;
    } else if (!arg.startsWith('--')) {
      positional.push(arg);
    }
  }

  return positional;
}

function playlistImagePath(playlistInfo, sourcePath) {
  const extension = extname(sourcePath).toLowerCase() || '.jpg';
  return `/images/blog/playlists/${playlistInfo.slug}${extension}`;
}

async function findMusicCover(playlistInfo) {
  if (coverImage || noMusicCover || !process.env.APPLE_MUSIC_USER_TOKEN) {
    return undefined;
  }

  try {
    const playlist = await findLibraryPlaylist(playlistInfo.sourceName);
    const artwork = playlist?.attributes?.artwork;
    const artworkUrl = artwork?.url;

    if (!playlist) {
      return undefined;
    }

    if (!artworkUrl) {
      console.warn(`Apple Music playlist found without artwork: ${playlistInfo.sourceName}`);
      return undefined;
    }

    const imageUrl = artworkUrl
      .replace('{w}', '1200')
      .replace('{h}', '1200');
    const response = await fetch(imageUrl);

    if (!response.ok) {
      console.warn(`Could not download Apple Music playlist artwork (${response.status}): ${imageUrl}`);
      return undefined;
    }

    const extension = '.jpg';
    const originalBytes = Buffer.from(await response.arrayBuffer());
    const bytes = compressImage(originalBytes, extension);

    return {
      featuredImage: `/images/blog/playlists/${playlistInfo.slug}${extension}`,
      bytes,
    };
  } catch (error) {
    console.warn(`Could not fetch Apple Music playlist artwork: ${error.message}`);
    return undefined;
  }
}

function compressImage(bytes, extension) {
  const inputPath = join('/tmp', `playlist-cover-input-${process.pid}`);
  const outputPath = join('/tmp', `playlist-cover-output-${process.pid}${extension}`);

  try {
    writeFileSync(inputPath, bytes);
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '85', '-Z', '1200', inputPath, '--out', outputPath], {
      stdio: 'ignore',
    });

    return readFileSync(outputPath);
  } catch {
    return bytes;
  }
}

async function findLibraryPlaylist(name) {
  let nextPath = '/v1/me/library/playlists?limit=100';

  while (nextPath) {
    const response = await appleMusicFetch(nextPath);
    const playlist = (response.data || []).find(item => item.attributes?.name === name);
    if (playlist) return playlist;

    nextPath = response.next;
  }

  console.warn(`Apple Music playlist not found: ${name}`);
  return undefined;
}
