const cart_items = document.querySelector('#cart .cart-items');
const pagination = document.getElementById('pagination');
const parentContainer = document.getElementById('EcommerceContainer');

// show products on the screen
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
//cart, cancel and purchase

document.addEventListener('click',(e)=>{

    // if (e.target.className=='shop-item-button'){
    //     const prodId = Number(e.target.parentNode.parentNode.id.split('-')[1]);
    //     //console.log(prodId);
    //     axios.post('http://localhost:3000/cart', { productId: prodId}).then(data => {
    //         if(data.data.error){
    //             throw new Error('Unable to add product');
    //         }
    //         document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1

    //         notifyUsers(data.data.message, false);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         notifyUsers(err, true);
    //     });

    // }
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        
        getCartDetails();
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1

    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert(' Added products to purchase !');
            return
        }
        
        axios.post(`http://localhost:3000/CreateOrder`).then(response=>{
            getCartDetails();
        }).catch(err=>console.log(err))
        
        alert('Thank You for Shopping')
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1

    }
})
   
// pagination

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


// adding products to the cart
function addToCart(productId) {
    axios.post('http://localhost:3000/cart', {productId: productId}).then((res) => {
       if (res.status === 200) {
            notifyUsers(res.data.message);
            document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
       } else {
            throw new Error (res.data.message);
       }
    }).catch(errMsg => {
        console.log(errMsg);
        notifyUsers(errMsg);
    });
}

// Getting the cart details 
function getCartDetails() {
    axios.get('http://localhost:3000/cart').then(res => {
        if (res.status === 200) {
            showProductsInCart(res.data);
            document.querySelector('#cart').style = "display:block;"
        } else {
            throw new Error('something went wrong');
        }
        
    }).catch(err => {notifyUsers(err)});
}

// showing the product details in cart

function showProductsInCart(productList){

    cart_items.innerHTML = "";

    for(let i=0;i<productList.products.length;i++){
        const id = `album-${productList.products[i].id}`;
        const name = `${productList.products[i].title} `;
        const img_src = `${productList.products[i].imageUrl}`;
        const price = productList.products[i].price;
        const qnty = productList.products[i].cartItem.quantity;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1

        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id',`in-cart-${id}`);

        cart_item.innerHTML = `
            <span class='cart-item cart-column'>
            <img class='cart-img' src="${img_src}" alt="">
                <span>${name}</span>
            </span>
            <span class='cart-price cart-column'>${price}</span>
            <form onsubmit='deleteCartItem(event, ${productList.products[i].id})' class='cart-quantity cart-column'>
                <input type="text" value="${qnty}"> 
                <button>REMOVE</button>
            </form>`
        cart_items.appendChild(cart_item)

    }
}

// not implemented yet

function deleteCartItem(e, prodId){
    e.preventDefault();
    axios.post('http://localhost:3000/cart-delete-item', {productId: prodId})
        .then(() => removeElementFromCartDom(prodId))
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