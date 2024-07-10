const http = require("http");
const path = require("path");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.ico': 'image/x-icon'
};

const requestListener = function (req, res) {
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = mimeTypes[extname] || 'application/octet-stream';

    console.log(`Request for ${filePath}, Content-Type: ${contentType}`);

    fs.readFile(filePath)
    .then(contents => {
        res.setHeader("Content-Type", contentType);
        res.writeHead(200);
        res.end(contents);
    })
    .catch(err => {
        console.error(`Error serving ${filePath}: ${err}`);
        res.writeHead(404);
        res.end("File not found");
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
