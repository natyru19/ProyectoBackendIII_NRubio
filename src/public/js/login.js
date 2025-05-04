document.getElementById("btnLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginUser();
});

const loginUser = async() => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    const user = {
        email : email.value ,
        password : password.value
    }

    let opts = {
        method : 'POST',
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(user)
    }

    const response = await fetch(`/api/sessions/login`, opts)
    const dataFromResponse = await response.json();

    if(response.status == 200){
        window.location.href = "/api/sessions/current";
    }else{
        Swal.fire("No se pudo loggear");
    }

}