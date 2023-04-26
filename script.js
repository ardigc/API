const search = new URLSearchParams(window.location.search);
// const url = window.location.href
const id = search.get("id");
// console.log(id)
// const button = document.querySelector('.btn');
const saveBtn = document.querySelector(".save");
const intro = document.querySelector(".intro");
intro.append(createElement("button", "", "Volver al inicio"));
intro.addEventListener("click", () => {
  window.location.assign(window.location.origin);
});
// button.addEventListener('click', async () => {
//     const request = await fetch('/api/message');
//     const message = await request.text();
//     alert(message);
// });
//   Deteniendo ejecución
const buttonCarrito = document.querySelector(".button-position");

if (!id === !null) {
  async function getProduct() {
    const response = await fetch("/api/products", {
      method: "GET",
    });
    const body = await response.json();
    return body;
  }
  //   console.log(getProduct());
  async function main() {
    const products = await getProduct();
    // console.log(products)
    const gridProduct = document.querySelector(".grid-products");
    const prod = products.map(createProduct);
    gridProduct.append(...prod);
  }

  function createProduct(product) {
    const productBox = createElement("div", "product-box");
    const nameBox = createElement("div", "name-box", product.name);
    const descriptionBox = createElement(
      "div",
      "item-box",
      product.description
    );
    const priceBox = createElement("div", "price-box", product.price + "€");
    productBox.append(nameBox);
    productBox.append(descriptionBox);
    productBox.append(priceBox);
    productBox.addEventListener("click", (ev) => {
      window.location.assign(window.location.href + "?id=" + product.id);
    });
    return productBox;
  }
  main();
} else {
  async function getProductID() {
    const response = await fetch("/api/products/" + id, {
      method: "GET",
    });
    const body = await response.json();
    return body;
  }

  async function prueba() {
    const productsID = await getProductID();
    // console.log(productsID)
    const gridProduct = document.querySelector(".grid-products");
    gridProduct.setAttribute("class", "grid-product");
    const prod = createProduct(productsID);
    gridProduct.append(prod);
    function createProduct(product) {
      const productBox = createElement("div", "product-box");
      const nameBox = createElement("div", "name-box", product.name);
      const descriptionBox = createElement(
        "div",
        "item-box",
        product.description
      );
      const priceBox = createElement("div", "price-box", product.price + "€");
      const button = createElement("button", "buy-button", "comprar");
      const buttonBox = createElement("div", "button-box", button);
      productBox.append(nameBox);
      productBox.append(descriptionBox);
      productBox.append(priceBox);
      productBox.append(buttonBox);
      button.addEventListener("click", async (ev) => {
        const request = await fetch("/api/shopping", {
          method: "POST",
          body: JSON.stringify({ message: product }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const message = await request.text();
        showCarrito.innerHTML = " ";
        callCart();
        // console.log(message)
      });

      return productBox;
    }
  }
  prueba();
}

function createItem(item) {
  // console.log(item);
  const nameBox = createElement("div", "item-name", item.name);
  // const descriptionBox = createElement("div", "item-description", item.description)
  const priceBox = createElement(
    "div",
    "item-price",
    "Unidades " + item.qt + "   " + item.price + "€"
  );
  const itemBox = createElement("div", "item-box");
  itemBox.append(nameBox);
  // itemBox.append(descriptionBox);
  itemBox.append(priceBox);
  // console.log()
  return itemBox;
}
const showCarrito = document.querySelector(".carrito");
function renderizarCarro(carrito) {
  const carritoList = carrito.map(createItem);
  showCarrito.append(...carritoList);
  let totalPrice = 0;
  for (let x = 0; x < carrito.length; x++) {
    const currentPrice = parseFloat(carrito[x].price);
    totalPrice = totalPrice + currentPrice * carrito[x].qt;
  }
  const endBox = createElement("div", "end-carrito");
  // console.log(totalPrice)
  const buttonEmpty = createElement(
    "button",
    "empty-carrito",
    "Vaciar carrito"
  );
  endBox.append(createElement("div", "empty-button", buttonEmpty));
  endBox.append(
    createElement("div", "total-price", "Total price is " + totalPrice + "€")
  );
  showCarrito.append(endBox);
  buttonEmpty.addEventListener("click", async (ev) => {
    showCarrito.innerHTML = " ";
    const request = await fetch("/api/empty", {
      method: "POST",
      body: JSON.stringify({ message: [] }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const message = await request.text();
    callCart();
  });
}
buttonCarrito.addEventListener("click", (ev) => {
  if (showCarrito.className.includes("fuera")) {
    showCarrito.setAttribute("class", "carrito show");
  } else if (showCarrito.className.includes("show")) {
    showCarrito.setAttribute("class", "carrito hide-carrito");
  } else {
    showCarrito.setAttribute("class", "carrito show");
  }
});
async function callCart() {
  const response = await fetch("/api/shopping", {
    method: "GET",
  });
  const body = await response.json();
  renderizarCarro(body);
  return body;
}
callCart();


saveBtn.addEventListener("click", async () => {
  const request = await fetch("/api/save", {
    method: "POST",
    body: JSON.stringify({ message: Math.random().toString(36) }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const message = await request.text();
  // console.log(message);
});
function sesion() {
  const sesion = document.querySelector(".sesion-dad");
  const sesionBox = createElement("div", "sesion-box");
  sesionBox.setAttribute("id", "sesion")
  const formBox = createElement("form", "form-box",)
  const nameLabel = createElement("label","","Nombre:")
  nameLabel.setAttribute("for", "name")
  const nameInput = createElement("input","",)
  nameInput.setAttribute("id", "name")
  nameInput.setAttribute("type", "text")
  nameInput.setAttribute("name", "name")
  const passwordLabel = createElement("label","","Password:")
  passwordLabel.setAttribute("for", "password")
  const passwordInput = createElement("input","",)
  passwordInput.setAttribute("id", "password")
  passwordInput.setAttribute("type", "password")
  passwordInput.setAttribute("name", "password")
  sesion.append(sesionBox);
  sesionBox.append(formBox)
  formBox.append(nameLabel)
  formBox.append(nameInput)
  formBox.append(passwordLabel)
  formBox.append(passwordInput)
}
const openSesion = document.querySelector(".sesion-button")
openSesion.addEventListener("click", ()=>{
  const sesionBox =document.getElementById("sesion")
  console.log(sesionBox)
 if (!sesionBox) {
   sesion()
 } else {
  sesionBox.remove()
 }
})
const form = document.querySelector(".form-box");
if (form && form instanceof HTMLFormElement) {
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target)
    console.log(data.get("name"));
    console.log(data.get("password"));
  });
}

    function createElement(tag, styles, content) {
      const element = document.createElement(tag);
      element.setAttribute("class", styles);
      if (!!content === false) {
      } else {
        if (Array.isArray(content)) {
          element.append(...content);
        } else {
          element.append(content);
        }
      }
      return element;
    }