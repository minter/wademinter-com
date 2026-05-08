import { appleMusicConfig, appleMusicFetch, createDeveloperToken } from './apple-music.mjs';

const config = appleMusicConfig();
const developerToken = createDeveloperToken();
const tokenParts = developerToken.split('.');

console.log(`Developer token generated with ${tokenParts.length} JWT parts.`);
console.log(`Storefront: ${config.storefront}`);

const term = encodeURIComponent('I Love You Always Forever Donna Lewis');
const result = await appleMusicFetch(`/v1/catalog/${config.storefront}/search?types=songs&limit=1&term=${term}`);
const song = result.results?.songs?.data?.[0];

if (!song) {
  console.log('Catalog search succeeded, but no song result was returned.');
} else {
  console.log(`Catalog search succeeded: ${song.attributes.name} - ${song.attributes.artistName}`);
}

if (config.userToken) {
  const playlists = await appleMusicFetch('/v1/me/library/playlists?limit=5');
  console.log(`Library playlist request succeeded: ${playlists.data?.length ?? 0} playlist(s) returned.`);

  for (const playlist of playlists.data || []) {
    const name = playlist.attributes?.name || '(unnamed playlist)';
    const hasArtwork = playlist.attributes?.artwork ? 'artwork' : 'no artwork';
    console.log(`- ${name} (${hasArtwork})`);
  }
} else {
  console.log('APPLE_MUSIC_USER_TOKEN is not set; skipping library playlist request.');
}
