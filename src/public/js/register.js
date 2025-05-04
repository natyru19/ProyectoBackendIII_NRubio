document.getElementById("btnRegister").addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
});

const clearFields = ()=>{
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    age.value = "";
    password.value = "";
}

const registerUser = async() => {
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let age = document.getElementById("age");
    let password = document.getElementById("password");

    const user = {
        firstName : firstName.value ,
        lastName : lastName.value,
        email : email.value,
        age: parseInt(age.value),
        password : password.value
    }

    let opts = {
        method : 'POST',
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(user)
    }

    const response = await fetch(`/api/sessions/register`, opts)
    const dataFromResponse = await response.json();    
    
    if(response.status == 201){
        window.location.href = "/login";
    }else{
        Swal.fire("No se pudo registrar el usuario");
        
    }

}