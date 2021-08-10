const http = require('http');
const { hostname } = require('os');
const host = ' localhost';
const port = process.env.PORT || 5000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello cloud computing class!');
});
server.listen(port, hostname, () => {
    console.log(`Sever is running at ${port}:`);
})