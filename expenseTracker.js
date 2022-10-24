"use strict";
const button = document.getElementById("btn");
const amount = document.getElementById("amount");
const description = document.getElementById("desc");
const category = document.getElementById("category");
const form = document.getElementById("expForm");
const listDetails = document.getElementById("listDetails");


form.addEventListener("submit", onClick);

function onClick(e) {
    e.preventDefault();
    if (amount.value === "" || description.value === "") {
        alert("Please Enter All Fields");
    }
    else {
        const expenseDetails = {
            expenseAmount: amount.value,
            expenseDescription: description.value,
            expenseCategory: category.value
        }
        
        //clearing fields
        amount.value = "";
        description.value="";
        category.value="";

        
       axios.post('http://localhost:3000/expense/add-expense', expenseDetails)
       .then((response) => {
        console.log(response);
        showDetailsOnScreen(response.data.newExpenseDetail);
        //console.log(response)
    })
       .catch((err) => console.log(err))
    }
}

window.addEventListener("DOMContentLoaded", () => {

    axios.get('http://localhost:3000/expense/get-expense')
    .then((response) => {
        for (var i = 0; i < response.data.allExpense.length; i++) {
            showDetailsOnScreen(response.data.allExpense[i]);
        }
    })
    .catch((err) => console.log(err))
    
    })

function showDetailsOnScreen(expense) {
    
    const parentNode = document.getElementById("listDetails");

    const childHTML = `<li id=${expense.id}>${expense.expenseAmount} : ${expense.expenseCategory}
    : ${expense.expenseDescription}
    <button onclick=deleteUser("${expense.id}")> Delete User </button>
    <button onclick="editDetails('${expense.expenseAmount}','${expense.expenseCategory}','${expense.expenseDescription}','${expense.id}')">Edit Details</button> </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// Edit user details

function editDetails(amount,category,description,expenseId) {


    document.getElementById("amount").value = amount;
    document.getElementById("category").value = category;
    document.getElementById("desc").value = description;
   
    deleteUser(expenseId);
}

// Delete User

function deleteUser(expenseId) {

    axios.delete(`http://localhost:3000/expense/delete-expense/${expenseId}`)
    .then((response) => {
        removeUserFromScreen(expenseId);
 })
    .catch((err) => console.log(err))

}

// Remove user from screen
function removeUserFromScreen(expenseId) {
const parentNode = document.getElementById("listDetails");
const deleteChild = document.getElementById(expenseId);
if(deleteChild) {
    parentNode.removeChild(deleteChild);
 }
}

