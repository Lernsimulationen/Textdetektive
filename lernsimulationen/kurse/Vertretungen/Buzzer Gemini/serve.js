import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 5173;
const DIST = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(DIST, reqPath === '/' ? 'index.html' : reqPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` Classroom Buzzer gestartet!`);
  console.log(` Adresse: http://localhost:${PORT}`);
  console.log(`=================================================`);
  
  // Browser automatisch öffnen
  exec(`start http://localhost:${PORT}`);
});
