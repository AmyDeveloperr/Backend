window.addEventListener('DOMContentLoaded',()=>{
    axios.get("http://localhost:3000/orders")
    .then(response =>{
        console.log(response)
       let purchase = document.getElementById('purchase')
       for(let i =0;i<response.data.products.length;i++) {
    
            for(let j=0;j<response.data.products[i].products.length;j++) {

           purchase.innerHTML+=`<div class="order-content">
           <ul id="order-list"><li>${response.data.products[i].products[j].id}-${response.data.products[i].products[j].price} -
           ${response.data.products[i].products[j].title}
           <img src=${response.data.products[i].products[j].imageUrl} width="100"> </li></ul>
           </div>`
         }
        }
        
    })
    .catch(err => console.log(err))
})