import { createPrivateKey, createSign } from 'crypto';
import { readFileSync } from 'fs';

const DEFAULT_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30;

export function appleMusicConfig() {
  const config = {
    teamId: process.env.APPLE_TEAM_ID,
    keyId: process.env.APPLE_MUSIC_KEY_ID,
    privateKeyPath: process.env.APPLE_MUSIC_PRIVATE_KEY_PATH,
    storefront: process.env.APPLE_MUSIC_STOREFRONT || 'us',
    userToken: process.env.APPLE_MUSIC_USER_TOKEN,
  };

  const missing = Object.entries({
    APPLE_TEAM_ID: config.teamId,
    APPLE_MUSIC_KEY_ID: config.keyId,
    APPLE_MUSIC_PRIVATE_KEY_PATH: config.privateKeyPath,
  }).filter(([, value]) => !value).map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing Apple Music env vars: ${missing.join(', ')}`);
  }

  return config;
}

export function createDeveloperToken(ttlSeconds = DEFAULT_TOKEN_TTL_SECONDS) {
  const config = appleMusicConfig();
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'ES256',
    kid: config.keyId,
  };
  const payload = {
    iss: config.teamId,
    iat: now,
    exp: now + ttlSeconds,
  };
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const privateKey = createPrivateKey(readFileSync(config.privateKeyPath));
  const signature = createSign('SHA256').update(signingInput).end().sign({
    key: privateKey,
    dsaEncoding: 'ieee-p1363',
  });

  return `${signingInput}.${base64url(signature)}`;
}

export async function appleMusicFetch(path, options = {}) {
  const config = appleMusicConfig();
  const developerToken = createDeveloperToken();
  const url = new URL(path, 'https://api.music.apple.com');

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${developerToken}`,
      ...(config.userToken ? {'Music-User-Token': config.userToken} : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Apple Music request failed (${response.status}): ${body}`);
  }

  return await response.json();
}

function base64url(value) {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return buffer
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}
