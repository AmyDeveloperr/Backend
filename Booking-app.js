const myform = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

myform.addEventListener("submit", onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(nameInput.value === "" || emailInput.value === "") {
        msg.classList.add("error");
        msg.innerHTML = "Please Enter All Fields";
        setTimeout(() => msg.remove(), 4000);
    } else {
       
        const userDetails = {
            name: nameInput.value,
            email: emailInput.value
        }

       //clearing fields

       nameInput.value = "";
       emailInput.value = ""; 

       axios.post('http://localhost:3000/user/add-user', userDetails)
       .then((response) => {
        showUsersOnScreen(response.data.newUserDetail);
        //console.log(response)
    })
       .catch((err) => console.log(err))

    }
}

window.addEventListener("DOMContentLoaded", () => {
// Object.keys(localStorage).forEach((key) => {

//     const stringifiedDetails = localStorage.getItem(key);
//     const details = JSON.parse(stringifiedDetails);
    axios.get('http://localhost:3000/user/get-users')
    .then((response) => {
        for (var i = 0; i < response.data.allUsers.length; i++) {
            showUsersOnScreen(response.data.allUsers[i]);
        }
    })
    .catch((err) => console.log(err))
})

function showUsersOnScreen(user) {
    
const parentNode=document.getElementById("users");
const childHTML=`<li id=${user.id}>${user.name}:${user.email} 
<button onclick=deleteUser("${user.id}")> Delete User </button> 
<button onclick='editDetails("${user.name}","${user.email}","${user.id}")'> Edit Details </button>
</li>`;
parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit user details

function editDetails(name,email,userId) {
    
        document.getElementById("name").value = name;
        document.getElementById("email").value = email;
        deleteUser(userId);
}

//Delete user

function deleteUser(userId) {

    axios.delete(`http://localhost:3000/user/delete-user/${userId}`)
    .then((response) => {
        removeUserFromScreen(userId);
     
 })
    .catch((err) => console.log(err))

}

function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('users');
    const deleteChild = document.getElementById(userId);
        if (deleteChild) {
    parentNode.removeChild(deleteChild);
 }
}
