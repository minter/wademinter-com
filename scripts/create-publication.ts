import { StandardSitePublisher } from '@bryanguffey/astro-standard-site';

const publisher = new StandardSitePublisher({
  identifier: 'wademinter.com',
  password: process.env.ATPROTO_APP_PASSWORD!,
});

await publisher.login();

const result = await publisher.publishPublication({
  name: 'H. Wade Minter',
  url: 'https://wademinter.com',
  description: 'Technology leader, NHL PA announcer, improv comedian, and builder of weird things.',
  basicTheme: {
    background: { r: 19, g: 41, b: 48 },      // --color-hero-bg #132930
    foreground: { r: 224, g: 224, b: 224 },     // light text
    accent: { r: 52, g: 152, b: 219 },          // --color-accent #3498db
    accentForeground: { r: 255, g: 255, b: 255 },
  },
});

console.log('Publication created!');
console.log('AT-URI:', result.uri);
console.log('Save this rkey for verification:', result.uri.split('/').pop());
