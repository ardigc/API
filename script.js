const search = new URLSearchParams(window.location.search);
// const url = window.location.href
const id= search.get("id");
console.log(id)
// const button = document.querySelector('.btn');
const saveBtn = document.querySelector('.save');

// button.addEventListener('click', async () => {
//     const request = await fetch('/api/message');
//     const message = await request.text();
//     alert(message);
// });
//   Deteniendo ejecución
if (!id === !null) {
  async function getProduct() {
      const response = await fetch('/api/products', {
          method: "GET",
        });
        const body = await response.json();
        return body;
      }
    //   console.log(getProduct());
      async function main() {
          const products = await getProduct()
          console.log(products)
          const gridProduct = document.querySelector('.grid-products')
          const prod = products.map(createProduct)
          gridProduct.append(...prod);
        }

     function createProduct(product) {
    const productBox = createElement('div', 'product-box',);
    const nameBox = createElement('div', 'name-box', product.name)
    const descriptionBox = createElement('div', 'item-box', product.description)
    const priceBox = createElement('div', 'price-box', product.price+"€")
    productBox.append(nameBox)
    productBox.append(descriptionBox)
    productBox.append(priceBox)
    productBox.addEventListener("click", (ev) => {
    window.location.assign(window.location.href+"?id="+product.id)
  });
    return productBox
}
main()
}else{
        async function getProductID() {
            const response = await fetch('/api/products/'+id, {
                method: "GET",
            });
            const body = await response.json();
            return body;
        }
       
        async function prueba() {
            const productsID = await getProductID()
            console.log(productsID)
            const gridProduct = document.querySelector('.grid-products')
            gridProduct.setAttribute('class', 'grid-product')
          const prod = createProduct(productsID)
          gridProduct.append(prod);
          function createProduct(product) {
            const productBox = createElement('div', 'product-box',);
            const nameBox = createElement('div', 'name-box', product.name)
            const descriptionBox = createElement('div', 'item-box', product.description)
            const priceBox = createElement('div', 'price-box', product.price+"€")
            const button = createElement("button", "buy-button", "comprar");
            const buttonBox = createElement("div", "button-box", button);
            productBox.append(nameBox)
            productBox.append(descriptionBox)
            productBox.append(priceBox)
            productBox.append(buttonBox)
            button.addEventListener("click", async (ev) => {
              const request = await fetch('/api/shopping', {
                method: 'POST',
                body: JSON.stringify({ message: product }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            const message = await request.text();
            console.log(message)
            })
            return productBox
        }
          }
          prueba()
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
saveBtn.addEventListener('click', async () => {
    const request = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ message: Math.random().toString(36) }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const message = await request.text();
    console.log(message);
});
