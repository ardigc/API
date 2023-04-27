const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  const pathName = path.join(__dirname, "index.html");
  const file = await fs.readFile(pathName);
  res.statusCode = 200;
  res.setHeader("content-type", "text/html");
  res.send(file);
});

app.get("/script.js", async (req, res) => {
  const pathName = path.join(__dirname, "script.js");
  const file = await fs.readFile(pathName);
  res.statusCode = 200;
  res.setHeader("content-type", "application/javascript");
  res.send(file);
});
app.get("/styles.css", async (req, res) => {
  const pathName = path.join(__dirname, "styles.css");
  const file = await fs.readFile(pathName);
  res.statusCode = 200;
  res.setHeader("content-type", "text/css");
  res.send(file);
});

app.get("/api/message", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.send("Mandado desde la api");
});
app.get("/api/products/", async (req, res) => {
  const pathName = path.join(__dirname, "products.json");
  const file = await fs.readFile(pathName);
  const txt = file.toString("utf8");
  const data = JSON.parse(txt);
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");
  // res.send(JSON.stringify(products));
  res.send(data);
});
// app.get('/api/products/', (req, res) => {

//     res.statusCode = 200;
//     res.setHeader('Access-Control-Allow-Methods', 'GET');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Authorization'
//     );
//     res.setHeader('Content-Type', 'application/json')
//     res.send(JSON.stringify(products));
// });
app.get("/api/products/:id", async (req, res) => {
  const pathName = path.join(__dirname, "products.json");
  const file = await fs.readFile(pathName);
  const txt = file.toString("utf8");
  const data = JSON.parse(txt);
  const id = req.params.id;
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // console.log(products)
  const index = data.find((element) => element.id == id);
  // console.log(index)
  res.setHeader("Content-Type", "application/json");
  res.send(index);
});

// app.get('/user/:id', function (req, res) {
//     console.log('and this matches too')
//     res.end()
//   })
app.post("/api/save", async (req, res) => {
  const msg = req.body.message;
  const pathName = path.join(__dirname, "msg.txt");
  const file = await fs.readFile(pathName);
  const txt = file.toString("utf8");
  const newText = `${txt}
${msg}`;
  fs.writeFile(pathName, newText);
  res.statusCode = 200;
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.send("Mandado desde la api");
});
app.get("/api/shopping", async (req, res) => {
  const pathName = path.join(__dirname, "cart.json");
  const file = await fs.readFile(pathName);
  const txt = file.toString("utf8");
  const id = req.cookies.id;
  //   console.log(id);
  
  if (!id) {
    const emp = [];
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.send(emp);
  } else {
    if (txt.length <= 2) {
      const emp = [];
      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.send(emp);
    } else {
      const data = JSON.parse(txt);
      const user = data.find((element) => element.id === id);
      console.log(id)
      if (!user) {
        const emp = [];
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.send(emp);
    } else if (user.carro.length === 0){
        const emp = [];
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.send(emp);
      }else {
        console.log(data);
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.send(user.carro);
      }
    }
  }
});
app.post("/api/empty", async (req, res) => {
  const msg = req.body.message;
  const id = req.cookies.id;
  const pathName = path.join(__dirname, "cart.json");
  const file = await fs.readFile(pathName);
  const txt = file.toString("utf8");
  const data = JSON.parse(txt);
  const user = data.find((element) => element.id === req.cookies.id);
  const userIndex = data.findIndex(
    (element) => element.id === req.cookies.id
  );
  if (!!user) {
    const index = data[userIndex].carro.findIndex(
      (element) => element.id === msg.id
    );
    data[userIndex].carro = msg
  fs.writeFile(pathName, JSON.stringify(data));
}

  res.statusCode = 200;
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.send("Mandado desde la api");
});
app.post("/api/shopping", async (req, res) => {
  const msg = req.body.message;
  // console.log(msg)
  const pathName = path.join(__dirname, "cart.json");
  const file = await fs.readFile(pathName);
  const txt = file.toString("utf8");
  if (txt.length === 0) {
      fs.writeFile(pathName, JSON.stringify(cart));
    } else {
    cart = [{ id: req.cookies.id, carro: [msg] }];
    // console.log(cart);
    const data = JSON.parse(txt);
    const user = data.find((element) => element.id === req.cookies.id);
    const userIndex = data.findIndex(
      (element) => element.id === req.cookies.id
    );
    if (!!user === true) {
      // const data = JSON.parse(txt)
      // console.log(data)
      // const ident = data[userIndex].find((element) => element.id === msg.id);
      const index = data[userIndex].carro.findIndex(
        (element) => element.id === msg.id
      );
      // console.log(!ident)
      // si no existe retorna -1
      //   console.log(index);
      if (index >= 0) {
        data[userIndex].carro[index].qt++;
      } else {
        // console.log(data);

        const newData = data[userIndex].carro.push(msg);
      }
      // const newFile = data.push(msg)
      // const newFile = `${data}
      // ${msg}`;
      fs.writeFile(pathName, JSON.stringify(data));
    } else {
      cart = { id: req.cookies.id, carro: [msg] };
      const newData = data.push(cart);
      fs.writeFile(pathName, JSON.stringify(data));
    }
  }
  res.statusCode = 200;
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  console.log("User id :  ", req.cookies.id);
  res.send("Mandado desde la api");
});
app.post("/api/singIn", async (req, res) => {
  const user = req.body;
  const pathName = path.join(__dirname, "users.json");
  const file = await fs.readFile(pathName);
  const txt = file.toString("utf8");
  // if (txt.length>1) {
  const data = JSON.parse(txt);
  //   console.log(data);
  const ident = data.find((element) => element.name === user.name);
  //   console.log(!!ident);
  if (!ident) {
    res.statusCode = 401;
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.send("Creedenciales incorrectas");
  } else {
    if (ident.password === user.password) {
      res.statusCode = 200;
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      const id = JSON.stringify({ id: ident.id });
      console.log(id);
      res.send(id);
    } else {
      res.statusCode = 401;
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      res.send("Creedenciales incorrectas");
    }
  }
  // const index = data.findIndex((element) => element.id === user.id);
  // if (!!ident === true) {
  // retornar ID
  //   data[index].qt++;
  // } else {
  // user.id = data.length;
  //   const newData = data.push(user);
  // }
  // fs.writeFile(pathName, JSON.stringify(data));
  // } else {
  // user.id = 0;
  // fs.writeFile(pathName, JSON.stringify([user]))
  // }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
