const button = document.querySelector('.btn');
const saveBtn = document.querySelector('.save');

button.addEventListener('click', async () => {
    const request = await fetch('/api/message');
    const message = await request.text();
    alert(message);
});
//   Deteniendo ejecución
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
          return products
        }
        main()
    
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
// saveBtn.addEventListener('click', async () => {
//     const request = await fetch('/api/save?id=8', {
//         method: 'POST',
//         body: JSON.stringify({ message: Math.random().toString(36) }),
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//         },
//     });
//     const message = await request.text();
//     console.log(message);
// });
