import { getSingleAd, getUser } from '../../config firebase/script.js'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth, logOut, } from "../../config firebase/script.js";





onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const userName = document.getElementById('userName')
      userName.innerHTML = user.email
      const userName1024 = document.getElementById('userName1024')
      userName1024.innerHTML = user.email
      userName1024.style.fontSize = '18px'
      userName1024.style.fontWeight = '800'
    
  
    } else {
      location.href = '../../login/login.html'
  
    }
  });



function loadData() {
    const productId = window.location.search.includes('product') ? window.location.search.split('=')[1] : null;
    const adId = window.location.search.includes('ad') ? window.location.search.slice(6) : null;

    if (productId) {
        getProductDetail(productId);
    } else if (adId) {
        getAdDetail(adId);
    } else {
        console.error('Invalid URL parameters');
    }
}

async function getProductDetail(productId) {
    fetch('https://dummyjson.com/products/' + productId)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            const sliderDiv = document.getElementById('slider')
            // function plusSlides(n){
            let slideIndex = 1;
            for (var n = 1; n < 5; n++) {
                const div = document.createElement('div')
                div.className = "mySlides fade block"
                const img = document.createElement('img')
                img.src = res.images[n]
                console.log(img.src)
                div.append(img)
                // console.log(div)
                sliderDiv.append(div)

                showSlides(slideIndex);

                // Next/previous controls
                window.plusSlides = (n) => {
                    showSlides(slideIndex += n);
                }

                // Thumbnail image controls
                window.currentSlide = (n) => {
                    showSlides(slideIndex = n);
                }

                function showSlides(n) {
                    let i;
                    let slides = document.getElementsByClassName("mySlides");
                    let dots = document.getElementsByClassName("dot");
                    if (n > slides.length) { slideIndex = 1 }
                    if (n < 1) { slideIndex = slides.length }
                    for (i = 0; i < slides.length; i++) {
                        slides[i].style.display = "none";
                    }
                    for (i = 0; i < dots.length; i++) {
                        dots[i].className = dots[i].className.replace(" active", "");
                    }
                    slides[slideIndex - 1].style.display = "block";
                    dots[slideIndex - 1].className += " active";
                }
            }
            const container = document.getElementById('right-div')

            const contChild = document.createElement('div')
            contChild.className = 'h-full'

            const titleDiv = document.createElement('div')
            titleDiv.innerHTML = `Title: ${res.title}`
            titleDiv.className = "ad-Data"
            const webTitle = document.getElementById('title')
            webTitle.innerHTML = res.title


            const description = document.createElement('div')
            description.innerHTML = `Description: ${res.description}`
            description.className = "ad-Data"




            contChild.append(titleDiv)
            contChild.append(description)



            container.append(contChild)



        });
}

async function getAdDetail(adId) {
    const ad = await getSingleAd(adId);
    const user = await getUser(ad.uid);
    console.log('user', user);
    const sliderDiv = document.getElementById('slider')
    const div = document.createElement('div')
    div.className = "mySlides fade block"
    const img = document.createElement('img')
    img.style.width = '200px'
    img.style.height = '350px'
    img.src = ad.image
    console.log(img.src)
    
        div.append(img)
        // console.log(div)
        sliderDiv.append(div)
    
    const container = document.getElementById('right-div')

    const contChild = document.createElement('div')
    contChild.className = 'h-full'

    const titleDiv = document.createElement('div')
    titleDiv.innerHTML = `Title: ${ad.title}`
    titleDiv.className = "ad-Data"
    
    const webTitle = document.getElementById('title')
    webTitle.innerHTML = ad.title

    const description = document.createElement('div')
    description.innerHTML = `Description: ${ad.description}`
    description.className = "ad-Data"

    const contact = document.createElement('div')
    contact.innerHTML =  `Contact Information : <br>
   Name: ${user.fullName } <br> Cell: ${user.phoneNumber}`
    contact.className = "ad-Data"

    contChild.append(titleDiv)
    contChild.append(description)
    contChild.append(contact)
    container.append(contChild)
}

loadData();

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