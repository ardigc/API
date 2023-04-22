const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const pathName = path.join(__dirname, 'index.html');
    const file = await fs.readFile(pathName);
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    res.send(file);
});

app.get('/script.js', async (req, res) => {
    const pathName = path.join(__dirname, 'script.js');
    const file = await fs.readFile(pathName);
    res.statusCode = 200;
    res.setHeader('content-type', 'application/javascript');
    res.send(file);
});

app.get('/api/message', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    res.send('Mandado desde la api');
});

app.post('/api/save', (req, res) => {
    console.log(req.body);
    res.statusCode = 200;
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    res.send('Mandado desde la api');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
