const button = document.querySelector('.btn');
const saveBtn = document.querySelector('.save');

button.addEventListener('click', async () => {
    const request = await fetch('/api/message');
    const message = await request.text();
    alert(message);
});

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
