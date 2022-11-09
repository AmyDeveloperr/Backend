
const email = document.getElementById('email');
const name = document.getElementById('name');
const pass = document.getElementById('pass');

function postSignup () {

    const userDetails = {
        emailId: email.value,
        userName: name.value,
        pass: pass.value
    }
    backendPost(userDetails);
}

postSignup();

async function backendPost(userDetails) { 
    try{
        const res = await axios.post('', userDetails)
        if (res.status === 200) {
            window.location.href ='login.html';
        } else {
            throw new Error('Network Error');
        }
    }catch(err) {
        document.body.innerHTML += `<div style="color:red">${err}</div>`
    }
   
}