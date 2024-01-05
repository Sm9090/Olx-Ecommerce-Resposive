import { onLogIn ,logInWithFacebook } from "../config firebase/script.js";


window.logIn = function () {

    let email = document.getElementById('lemail').value
    let password = document.getElementById('lpass').value

    const user = { email, password }
    onLogIn(user)

    // window.location.href = '../src/olx landing page/olx.html'

}


window.logInWithFacebook = function(){
    logInWithFacebook()
}