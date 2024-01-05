import { auth, getMyAdsFromDb, } from "../../config/firebase.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const userName = document.getElementById('userName')
      userName.innerHTML = user.email
      const userName1024 = document.getElementById('userName1024')
      userName1024.innerHTML = user.email
      userName1024.style.fontSize = '18px'
      userName1024.style.fontWeight = '800'
      console.log(userName1024)
      getMyAds()
  
    } else {
      location.href = '../../login/login.html'
  
    }
  });

async function getMyAds() {
    const uid = auth.currentUser.uid
    const product = document.getElementById('productCard')
    const ads = await getMyAdsFromDb(uid)

    for (var i = 0; i < ads.length; i++) {
        const ad = ads[i]
        const product = document.getElementById('productCard')
        const card = document.createElement('div')
        card.className = 'card-UI'
        card.onclick = function () {
            window.location.href = `../ads page/ads.html?adId=${ad.id}`
        }

        const img = document.createElement('img')
        img.src = ad.image
        img.style.width = '270px'
        img.style.height = '150px'


        const child = document.createElement('div')
        child.style.padding = '10px'

        const title = document.createElement('h4')
        title.innerHTML = ad.title

        const description = document.createElement('p')
        description.style.margin = '5px'
        description.innerHTML = ad.description

        const price = document.createElement('h5')
        price.style.display = 'inline-block'
        price.innerHTML = `Rs. ${ad.amount}`


        card.append(img)
        child.append(title)
        child.append(description)
        child.append(price)
        card.append(child)
        product.append(card)
    }

}

window.menu = () => {
    let dropDown = document.getElementById('dropDown')
    let profile = document.getElementById('menuBar');
    if (profile.style.display === 'none' || profile.style.display === '') {
      profile.style.display = 'block'; 
      dropDown.style.transform = 'rotate(180deg)'
    } else {
      profile.style.display = 'none';
      dropDown.style.transform = 'rotate(0deg)'
  
    }
  }
  
  window.logOut = () => {
    logOut()
  }