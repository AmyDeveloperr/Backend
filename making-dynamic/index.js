const cart_items = document.querySelector('#cart .cart-items');

const pagination = document.getElementById('pagination');
const parentContainer = document.getElementById('EcommerceContainer');
parentContainer.addEventListener('click',(e)=>{

    // if(e.target.className === 'add-cart') {
    //     axios.post('http://localhost:3000/cart', {productId: productId}).then((data)=> {
    //         console.log(data);
    //     })
    // }

    if (e.target.className=='shop-item-button'){
        const id = e.target.parentNode.parentNode.id
        const name = document.querySelector(`#${id} h3`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
        let total_cart_price = document.querySelector('#total-value').innerText;
        const cartI = document.querySelector(`#in-cart-${id}`);
        console.log(cartI);
        if (document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added to the cart');
            return
        }
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id',`in-cart-${id}`);
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        cart_item.innerHTML = `
        <span class='cart-item cart-column'>
        <img class='cart-img' src="${img_src}" alt="">
            <span>${name}</span>
    </span>
    <span class='cart-price cart-column'>${price}</span>
    <span class='cart-quantity cart-column'>
        <input type="text" value="1">
        <button>REMOVE</button>
    </span>`
        cart_items.appendChild(cart_item)

        // const container = document.getElementById('container');
        // const notification = document.createElement('div');
        // notification.classList.add('notification');
        // notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
        // container.appendChild(notification);
        // setTimeout(()=>{
        //     notification.remove();
        // },2500)
    }
    if (e.target.className === 'cart-btn-bottom' || e.target.className === 'cart-bottom' || e.target.className === 'cart-holder'){
        getCartDetails();    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    if (e.target.className=='purchase-btn'){
        const purchaseBtn = document.getElementById('purchase-btn');
        purchaseBtn.addEventListener('click',(productId)=>{
                axios.post(`http://localhost:3000/CreateOrder`,{productId : productId})
               .then(response =>{
                console.log(response);
                cart_items.innerHTML = `<h1>Order has been successfully placed with order id ${response.data.data[0][0].OrderId}</h1>`;
               })
                .catch(err =>console.log(err))
            })

        // if (parseInt(document.querySelector('.cart-number').innerText) === 0){
        //     alert('You have Nothing in Cart , Add some products to purchase !');
        //     return
        // }
        // alert('Thanks for the purchase')
        // cart_items.innerHTML = ""
        // document.querySelector('.cart-number').innerText = 0
        // document.querySelector('#total-value').innerText = `0`;
    }

    if (e.target.innerText=='REMOVE'){
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})

// window.addEventListener('DOMContentLoaded', () => {
//     axios.get('http://localhost:3000/products').then((data) => {
//        if (data.request.status === 200) {
//         const products = data.data.products;
//         const parentSection = document.getElementById('product-content');
//         products.forEach(product => {

//             const productHtml = `
//             <div id=${product.title}>
//                 <h3>${product.title}</h3>
//                 <div class="image-container">
//                 <img class="prod-images" src=${product.imageUrl}></img>
//                 </div>
//                 <div class="prod-details">
//                 <span>$<span>${product.price}</span></span>
//                 <button class="shop-item-button" onclick="addToCart(${product.id})"> ADD TO CART </button>
//                 </div>
//             </div>`
//             parentSection.innerHTML += productHtml; 
//         })
//        }
//     })
// })

function listProducts(prod) {
    const parentSection = document.getElementById('product-content');
    parentSection.innerHTML = '';
    prod.forEach(product => {
        const productHtml = `
        <div id=${product.title}>
            <h3>${product.title}</h3>
            <div class="image-container">
            <img class="prod-images" src=${product.imageUrl}></img>
            </div>
            <div class="prod-details">
            <span>$<span>${product.price}</span></span>
            <button class="shop-item-button" onclick="addToCart(${product.id})"> ADD TO CART </button>
            </div>
        </div>`
        parentSection.innerHTML = parentSection.innerHTML + productHtml; 
        
       
    })
}

   
window.addEventListener('DOMContentLoaded', () => {
    const page = 1;
    axios.get(`http://localhost:3000/products?page=${page}`)
    .then((res) => {
        listProducts(res.data.products);
        showPagination(res.data);
    }).catch(err => console.log(err));

    // .then(({data: {products, ...pageData}}) => {
        //listProducts(products);
    // showPagination(pageData);
    // }).catch(err => console.log(err));


function showPagination({ 
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage
}) {
    
pagination.innerHTML = '';
    if(hasPreviousPage) {
        const btn2 = document.createElement('button');
        btn2.innerHTML = previousPage;
        btn2.addEventListener('click', () => getProducts(previousPage));
        pagination.appendChild(btn2);
    }
    const btn1 = document.createElement('button');
    btn1.innerHTML = `<h3>${currentPage}</h3>`;
    pagination.appendChild(btn1);
    btn1.addEventListener('click', () => getProducts(currentPage));
    

    if(hasNextPage) {
        const btn3 = document.createElement('button');
        btn3.innerHTML = nextPage;
        btn3.addEventListener('click', () => getProducts(nextPage));
        pagination.appendChild(btn3); 
    }
}


function getProducts(page) {

    axios.get(`http://localhost:3000/products?page=${page}`)
    .then((res) => {
        listProducts(res.data.products);
        showPagination(res.data);
    }).catch(err => console.log(err));


    // .then(({data: {products, ...pageData}}) => {
    //     //listProducts(products);
    //     showPagination(pageData);
    // }).catch(err => console.log(err));


    }

})

// function listProducts(prod) {

//     products.innerHTML = '';
//     productsData.forEach((product) => {
//         const prod = document.createElement('div');
//         prod.className = "product";
//         product.id = `product ${product.id}`;
//         prod.innerHTML = `<div class="product-image">
//             <img src=${product.imageUrl}
//                  alt=${product.title}
//         </div>
//         <div class="product-info">
//             <div class="product-top-row">
//                 <h3 class="product-name">${product.title}</h3>
//         </div>
//             <div class="product-bottom-row">
//                 <p class="product-price">$${product.price}</p>
//                 <button class="add-to-cart">Add to Cart </button>
//             </div>
//         </div>`;

//         products.appendChild(prod);
//     })
// }

function addToCart(productId) {
    axios.post('http://localhost:3000/cart', {productId: productId}).then((res) => {
       if (res.status === 200) {
            notifyUsers(res.data.message);
       } else {
            throw new Error (res.data.message);
       }

    }).catch(errMsg => {
        console.log(errMsg);
        notifyUsers(errMsg);
    });
}

function getCartDetails() {
    axios.get('http://localhost:3000/cart').then(res => {
        if (res.status === 200) {
            res.data.products.forEach((product) => {
                const cartContainer = document.getElementById('cart');
                cartContainer.innerHTML += `
                <div class="cart-row">
                <span class='cart-item cart-column'>
                <img class='cart-img' src="${product.imageUrl}" alt="">
                    <span>${product.title}</span>
                </span>
                <span class='cart-price cart-column'>${product.price}</span>
                <span class='cart-quantity cart-column'>
                <input type="text" value="1">
                <button>REMOVE</button>
                </span>
                </div>
                
                `;
            })

            // <li><img id="cart-img" src=${product.imageUrl}></img> -${product.title}</p> - ${product.price} - ${product.cartItem.quantity}</li>
            document.querySelector('#cart').style = "display:block;"

        } else {
            throw new Error('something went wrong');
        }
        
    }).catch(err => {notifyUsers(err)});
}

// notification product added or error

function notifyUsers(msg) {
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${msg}</h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500)
}



