const form1 = document.getElementById('lform');
const email = document.getElementById('lemail');
const name = document.getElementById('lname');
const pass = document.getElementById('lpass');

form1.addEventListener('submit', postlogin);

async function postlogin (e) {
    e.preventDefault();

    const loginDetails = {
       
        email: email.value,
        pass: pass.value
    }
    
        try{
            const res = await axios.post('http://localhost:3000/user/login', loginDetails);
            localStorage.setItem('token', res.data.token);

            if (res.status === 201) {
                //document.body.innerHTML += `<div style="color:pink">${res.data.message}</div>`;
                window.location.href = 'expense.html';
            } 
            if (res.status === 207) {
                document.body.innerHTML += `<div style="color:pink">${res.data.message}</div>`;

            }
            if (res.status === 208) {
                document.body.innerHTML += `<div style="color:pink">${res.data.message}</div>`;

            }
        }catch(err) {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        }
       
    }



