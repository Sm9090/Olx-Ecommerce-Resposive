console.log('script.js loaded sucessfully')
import { onLogIn , logInWithFacebook } from "./config/firebase.js";

window.logIn = function () {
    let email = document.getElementById('lemail').value
    let password = document.getElementById('lpass').value
    const user = { email, password }
    onLogIn(user)
}


window.logInWithFacebook = function(){
    logInWithFacebook()
}