
const forgotPass = document.getElementById('forgotPassForm');

forgotPass.addEventListener('submit', forgotPassword);

async function forgotPassword(e) {
    e.preventDefault();
    console.log(e.target.name)
    //const form = new formData(e.target);
    const email = e.target.email.value;

    const userDetails = {
        email
    }
    try {
    const response = await axios.post('http://localhost:3000/password/forgotpassword',userDetails);
        console.log(response);
        if(response.status === 202){
            document.body.innerHTML += '<div style="color:yellow;">Mail Successfuly sent <div>'
        } 
    }catch(err) {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;

    }

}


