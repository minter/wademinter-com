import { createServer } from 'http';
import { createDeveloperToken } from './apple-music.mjs';

const PORT = Number(process.env.APPLE_MUSIC_TOKEN_PORT || 8765);
const developerToken = createDeveloperToken();

const server = createServer((request, response) => {
  if (request.url === '/favicon.ico') {
    response.writeHead(404);
    response.end();
    return;
  }

  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  response.end(page(developerToken));
});

server.listen(PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log(`Open this URL in your browser to authorize Apple Music:`);
  console.log(url);
  console.log('');
  console.log('After authorization, copy the printed APPLE_MUSIC_USER_TOKEN into your shell env.');
  console.log('Press Ctrl+C here when you are done.');
});

function page(token) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Apple Music User Token</title>
  <script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"></script>
  <style>
    body {
      color: #111;
      font: 16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      margin: 3rem auto;
      max-width: 760px;
      padding: 0 1.5rem;
    }

    button {
      background: #fa233b;
      border: 0;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
      padding: 0.75rem 1rem;
    }

    pre {
      background: #f4f4f4;
      border-radius: 6px;
      overflow-x: auto;
      padding: 1rem;
      white-space: pre-wrap;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <h1>Apple Music User Token</h1>
  <p>Click authorize, sign into Apple Music if prompted, then copy the token into your environment.</p>
  <button id="authorize">Authorize Apple Music</button>
  <h2>Result</h2>
  <pre id="result">Waiting for authorization...</pre>

  <script>
    const developerToken = ${JSON.stringify(token)};
    const result = document.querySelector('#result');

    document.addEventListener('musickitloaded', async () => {
      try {
        const music = MusicKit.configure({
          developerToken,
          app: {
            name: 'Wade Playlist Tools',
            build: '1.0.0'
          },
          suppressErrorDialog: true
        });

        document.querySelector('#authorize').addEventListener('click', async () => {
          try {
            const authorizeResult = await music.authorize();
            const userToken = authorizeResult || music.musicUserToken;
            if (!userToken) {
              throw new Error('MusicKit authorize completed, but no music user token was returned.');
            }
            result.textContent = 'export APPLE_MUSIC_USER_TOKEN="' + userToken + '"';
          } catch (error) {
            result.textContent = 'Authorization failed:\\n' + formatError(error);
          }
        });
      } catch (error) {
        result.textContent = 'MusicKit setup failed:\\n' + formatError(error);
      }
    });

    function formatError(error) {
      if (!error) return 'Unknown error';
      const parts = [];
      if (error.name) parts.push('name: ' + error.name);
      if (error.message) parts.push('message: ' + error.message);
      if (error.status) parts.push('status: ' + error.status);
      if (error.stack) parts.push('stack: ' + error.stack);

      try {
        parts.push('json: ' + JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      } catch (_) {}

      return parts.length > 0 ? parts.join('\\n') : String(error);
    }
  </script>
</body>
</html>`;
}
