
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

