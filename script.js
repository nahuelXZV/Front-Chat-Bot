const forElement = document.getElementById("cuenta_login");

forElement.addEventListener("submit", (event) => {
    event.preventDefault();
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    let sesion = {user: user, password: password};
    let sesionJSON = JSON.stringify(sesion);
    console.log(sesionJSON);
    
    
})