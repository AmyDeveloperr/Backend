
const forgotPass = document.getElementById('forgotPassForm');

forgotPass.addEventListener('submit', forgotPassword);

function forgotPassword(e) {
    e.preventDefault();

    const form = new formData(e.target);

    const userDetails = {
        email: form.get('email')
    }
    try {
    const response = axios.post('http://localhost:3000/password/forgotpassword',userDetails);

        if(response.status === 202){
            document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }catch(err) {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;

    }

}