
const addCart = document.querySelectorAll('.shop-item-button');
console.log(addCart);

for (let i = 0; i < addCart.length; i++) {

    addCart[i].addEventListener('click', () => {
        addNotification();
    })
}


function addNotification() {

    const notif = document.createElement('div');
    notif.classList.add('toast');
    notif.innerText = `Your Product:  is added to the cart`;

    container.appendChild(notif);
    setTimeout(() => {
        notif.remove();
    },3000)
}