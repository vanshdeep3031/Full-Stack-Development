const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Request Made");

    res.setHeader('Content-Type', 'text/plain');
    res.write('Subscribe to vanshdeep');
    res.write('Please do it');
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log("Server is Running");
});
