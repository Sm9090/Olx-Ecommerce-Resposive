import{ postAdToDb , auth} from "../../config/firebase.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";



onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        const userName = document.getElementById('userName')
        userName.style.fontSize = '18px'
        userName.style.fontWeight = '800'
        userName.innerHTML = user.email
        getMyAds()

    } else {
        location.href = '../../login/login.html'

    }
});

window.onPost =  function () {
    
        const uid = auth.currentUser.uid;
        const allInputs = document.getElementsByClassName('input');
        const image = allInputs[0].files[0];
        const title = allInputs[1].value;
        const amount = allInputs[2].value;
        const description = allInputs[3].value;

        const ad = {
            title,
            amount,
            description,
            image,
            uid
        };

        // Assuming postAdToDb returns a Promise (async function)
         postAdToDb(ad);

        // The code here will execute after the asynchronous operation is complete.
        console.log('Ad posted successfully!');
    
        for(var i=0 ; i<allInputs.length; i++){
            allInputs[i].value = ''
        }
};
