import { register } from "../config/firebase.js"


window.onSignUp = function(){
const allInput = document.getElementsByTagName('input')
const fullName = allInput[0]
const email = allInput[1]
const phoneNumber = allInput[2]
const password = allInput[3]


const user = {
    fullName: fullName.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    password: password.value
}


for(var i=0 ; i<allInput.length; i++){
    allInput[i].value = ''
}

// window.location.href = '../login/login.html'



register(user)
}

