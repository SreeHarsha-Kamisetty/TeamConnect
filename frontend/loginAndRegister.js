const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpButton_mobile = document.getElementById('signUp_mobile');
const signInButton_mobile = document.getElementById('signIn_mobile');
const backendURL = "http://localhost:8080"

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

signUpButton_mobile.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton_mobile.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

let registerName = document.getElementById("r-name")
let registerEmail = document.getElementById("r-email")
let registerPassword = document.getElementById("r-password")

let registerBtn = document.getElementById("register")

registerBtn.addEventListener("click",()=>{
    let email = registerEmail.value
        let username = registerName.value
        let password = registerPassword.value
    if(email !== "" && username !== "" && password !== ""){
            register(email,username,password);
    }
    else{
        console.log("error")
    }
})

let loginEmail = document.getElementById("l-email")
let loginPassword = document.getElementById("l-password")
let loginBtn = document.getElementById("login")

loginBtn.addEventListener("click",()=>{
    let email = loginEmail.value
    let password = loginPassword.value

    if(email !== "" && password !== ""){
        login(email,password)
    }
    else{
        console.log("error");
    }
})

async function register(email,username,password){
    try {
        

    } catch (error) {
        
    }
}

async function login(email,password){
    try {
        
    } catch (error) {
        
    }
}