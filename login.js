const form = document.getElementById('form');
const email = document.getElementById('email');
const name = document.getElementById('name');
const pass = document.getElementById('pass');

form.addEventListener('submit', postlogin);

async function postlogin (e) {
    e.preventDefault();

    const loginDetails = {
        emailId: email.value,
        userName: name.value,
        pass: pass.value
    }
    
        try{
            const res = await axios.post('http://localhost:3000/user/login', loginDetails)

            if (res.status === 201) {
                document.body.innerHTML += `<div style="color:pink">${res.data.message}</div>`;
                //window.location.href ='login.html';
                console.log(res);
            } 
        }catch(err) {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        }
       
    }



