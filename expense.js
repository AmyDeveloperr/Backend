
// const form = document.getElementById('formExp');

// const amount = document.getElementById('expense');

// const description = document.getElementById('description');

// const category = document.getElementById('category');

// form.addEventListener('submit', addExpense);

// async function addExpense(e) {
//     e.preventDefault();
//     try {
//         console.log('add event listener calledm,1')
//     const expenseDetails = {
//         amount: amount.value,
//         description: description.value,
//         category: category.value
//     } 

//     // amount.value = '';
//     // description.value = '';
//     // category.value = '';
    
//    console.log('add event listener calledm,', expenseDetails)
//     const res = await axios.post('http://localhost:3000/expense/add', expenseDetails);
   
//         showDetailsOnScreen(res.data.expDetails);
    
//  }catch(err) {console.log(err)};

// }



// window.addEventListener("DOMContentLoaded", async(e) => {
//         e.preventDefault()
//     try {
//         const getData = await axios.get('http://localhost:3000/expense/get');
//         for (let i = 0; i < getData.data.allDetails.length; i++) {
//             showDetailsOnScreen(getData.data.allDetails[i]);
//         }
//     }catch(err) {console.log(err)}; 
// })

// function showDetailsOnScreen(details) {
    
//     document.body.innerHTML += `<div id="exp-format" style="color:yellow"><li>${details.amount} : ${details.description} : ${details.category}
//     <button onclick=deleteUser("${details.id}")> Delete User </button>
//     </li>
//     </div>`
// }

// async function deleteUser(id) {
//     const res = axios.delete(`http://localhost:3000/expense/delete-expense/${id}`)
//     window.location.href = 'expense.html';
// }




"use strict";
const amount = document.getElementById("expense");
const description = document.getElementById("description");
const category = document.getElementById("category");
const form = document.getElementById("formExp");
const listDetails = document.getElementById("listDetails");



form.addEventListener("submit", onClick);

async function onClick(e) {
    e.preventDefault();
    if (amount.value === "" || description.value === "") {
        alert("Please Enter All Fields");
    }
    else {
        const expenseDetails = {
           amount: amount.value,
            description: description.value,
            category: category.value
        }
        
        //clearing fields
        amount.value = "";
        description.value="";
        category.value="";

        try {
            const token = localStorage.getItem('token');
       const res = await axios.post('http://localhost:3000/expense/add', expenseDetails, {headers: {"Authorization": token}});
      
        showDetailsOnScreen(res.data.expDetails);
        //console.log(response)
        }catch(err) {console.log(err)};
    }
}

window.addEventListener("DOMContentLoaded", async() => {
    const token = localStorage.getItem('token');
    
    try {
    const res = await axios.get('http://localhost:3000/expense/get', {headers: {"Authorization" : token}});
    
        for (var i = 0; i < res.data.allDetails.length; i++) {
            showDetailsOnScreen(res.data.allDetails[i]);
        }
    }catch(err) {console.log(err)};
})
   

function showDetailsOnScreen(expense) {
    
    const parentNode = document.getElementById("listDetails");

    const childHTML = `<li id=${expense.id}>${expense.amount} : ${expense.category}
    : ${expense.description}
    <button class="btn" onclick="deleteUser('${expense.id}')"> Delete User </button>
    <button class="btn" onclick="editDetails('${expense.amount}','${expense.category}','${expense.description}','${expense.id}')">Edit Details</button> </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// Edit user details

function editDetails(amount,category,description,expenseId) {


    document.getElementById("expense").value = amount;
    document.getElementById("category").value = category;
    document.getElementById("description").value = description;
   
    deleteUser(expenseId);
}

// Delete User

async function deleteUser(id) {
    try {
        const token = localStorage.getItem('token');
    const res = await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`, {headers: {'Authorization': token}});
   
        removeUserFromScreen(id);
 
    }catch(err) {console.log(err)};
}

// Remove user from screen
function removeUserFromScreen(expenseId) {
const parentNode = document.getElementById("listDetails");
const deleteChild = document.getElementById(expenseId);
if(deleteChild) {
    parentNode.removeChild(deleteChild);
 }
}

document.getElementById('premBtn').onclick = async function (e) {
    const token = localStorage.getItem('token');
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, 
     "name": "Expense Project",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
        const token = localStorage.getItem('token');

         console.log(response);
         axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then((res) => {
               if(res.status === 202) {
                localStorage.setItem('user', true);
                alert('You are a Premium User Now');
               }
             
             
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}


function download(){
    axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
    });
}


