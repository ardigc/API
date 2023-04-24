
const products = [
    {
        name: 'Oriental Concrete Gloves',
        price: '374.00',
        description:
        'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
        qt: 1,
        ide: 1,
    },
    {
        name: 'Refined Metal Towels',
        price: '614.00',
        description:
            'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
        qt: 1,
        ide: 2,
    },
    {
        name: 'Bespoke Cotton Bacon',
        price: '811.00',
        description:
            'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
        qt: 1,
        ide: 3,
    },
    {
        name: 'Licensed Rubber Pants',
        price: '524.00',
        description:
            'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
        qt: 1,
        ide: 4,
    },
    {
        name: 'Unbranded Fresh Cheese',
        price: '186.00',
        description:
            'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
        qt: 1,
        ide: 5,
    },
    {
        name: 'Tasty Concrete Bacon',
        price: '40.00',
        description:
        'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
        qt: 1,
        ide: 6,
    },
    {
        name: 'Oriental Concrete Soap',
        price: '882.00',
        description:
            'The Football Is Good For Training And Recreational Purposes',
        qt: 1,
        ide: 7,
    },
    {
        name: 'Recycled Fresh Gloves',
        price: '307.00',
        description:
            'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
        qt: 1,
        ide: 8,
    },
    {
        name: 'Fantastic Bronze Pants',
        price: '182.00',
        description:
        'The Football Is Good For Training And Recreational Purposes',
        qt: 1,
        ide: 9,
    },
    {
        name: 'Rustic Steel Hat',
        price: '267.00',
        description:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
        qt: 1,
        ide: 11,
    },
    {
        name: 'Rustic Soft Chips',
        price: '553.00',
        description:
        'The Football Is Good For Training And Recreational Purposes',
        qt: 1,
        ide: 12,
    },
    {
        name: 'Small Soft Computer',
        price: '151.00',
        description:
            'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
        qt: 1,
        ide: 13,
    },
    {
        name: 'Rustic Bronze Towels',
        price: '133.00',
        description:
            'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
            qt: 1,
            ide: 14,
    },
    {
        name: 'Rustic Wooden Bacon',
        price: '264.00',
        description:
        'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
        qt: 1,
        ide: 15,
    },
    {
        name: 'Oriental Wooden Salad',
        price: '108.00',
        description:
            'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
            qt: 1,
            ide: 16,
        },
    {
        name: 'Luxurious Steel Pants',
        price: '680.00',
        description:
            'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
        qt: 1,
        ide: 17,
    },
    {
        name: 'Oriental Concrete Computer',
        price: '254.00',
        description:
            'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
            qt: 1,
            ide: 18,
        },
        {
            name: 'Unbranded Metal Shirt',
            price: '703.00',
            description:
            'The Football Is Good For Training And Recreational Purposes',
        qt: 1,
        ide: 19,
    },
    {
        name: 'Luxurious Granite Mouse',
        price: '255.00',
        description:
        'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
        qt: 1,
        ide: 20,
    },
    {
        name: 'Incredible Rubber Salad',
        price: '589.00',
        description:
        'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
        qt: 1,
        ide: 21,
    },
];
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
app.get('/api/products', (req, res) => {
    
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(products));
});

app.post('/api/save', async (req, res) => {
    const msg = req.body.message;
    const pathName = path.join(__dirname, 'msg.txt');
    const file = await fs.readFile(pathName);
    const txt = file.toString('utf8');
    const newText = `${txt}
${msg}`;
    fs.writeFile(pathName, newText);
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
