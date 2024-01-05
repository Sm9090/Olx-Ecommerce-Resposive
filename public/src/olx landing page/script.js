import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth, logOut, getAds, searchInAds } from "../../config/firebase.js";

// Global variable to hold ad data
// let ads = [];

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const userName = document.getElementById('userName');
    userName.innerHTML = user.email;
    const userName1024 = document.getElementById('userName1024');
    userName1024.innerHTML = user.email;
    userName1024.style.fontSize = '18px';
    userName1024.style.fontWeight = '800';
    console.log(userName1024);
    renderAds();
  } else {
    location.href = '../../login.html';
  }
});

getData();

function getData() {
  fetch('https://dummyjson.com/products')
  .then((res) => res.json())
    .then((res) => {
      const data = res.products;
      const product = document.getElementById('productCard');
      console.log(data);
      
      for (let i = 0; i < data.length; i++) {
        const card = document.createElement('div');
        card.className = 'card-UI';
        card.onclick = () => {
          location.href = '../ads page/ads.html?productId=' + data[i].id;
          console.log(data[i].id);
        };
        const image = document.createElement('img');
        image.src = data[i].thumbnail;
        image.style.width = '270px';
        image.style.height = '150px';

        const child = document.createElement('div');
        child.style.padding = '10px';

        const title = document.createElement('h4');
        title.innerHTML = data[i].title;
        
        const description = document.createElement('p');
        description.style.margin = '5px';
        description.innerHTML = data[i].description;

        const price = document.createElement('h5');
        price.style.display = 'inline-block';
        price.innerHTML = 'Price ' + data[i].price + '$';

        const rating = document.createElement('h5');
        rating.style.display = 'inline-block';
        rating.style.float = 'right';
        rating.innerHTML = 'rating ' + data[i].rating + '%';

        card.append(image);
        child.append(title);
        child.append(description);
        child.append(price);
        child.append(rating);
        card.append(child);
        product.append(card);
      }
    });
}

window.searchAds = async function () {
  const inputValue = document.getElementById('search').value.trim()
  if (!inputValue) {
    renderAds()
  } else {
      const ads = await searchInAds(inputValue)
      renderAdItems(ads)
  }
}

async function renderAds() {
  const ads = await getAds()

  renderAdItems(ads)
}


async function renderAdItems(ads) {
  // const ads = await getAds();
  const product = document.getElementById('productCard');
  // product.innerHTML = ''

  for (let i = 0; i < ads.length; i++) {
    const ad = ads[i];

    const card = document.createElement('div');
    card.className = 'card-UI';
    card.onclick = function () {
      window.location.href = `../ads page/ads.html?adId=${ad.id}`;
    };

    const img = document.createElement('img');
    img.src = ad.image;
    img.style.width = '270px';
    img.style.height = '150px';

    const child = document.createElement('div');
    child.style.padding = '10px';

    const title = document.createElement('h4');
    title.innerHTML = ad.title;

    const description = document.createElement('p');
    description.style.margin = '5px';
    description.innerHTML = ad.description;

    const price = document.createElement('h5');
    price.style.display = 'inline-block';
    price.innerHTML = `Rs. ${ad.amount}`;

    card.append(img);
    child.append(title);
    child.append(description);
    child.append(price);
    card.append(child);
    product.append(card);
  }
}


// Rest of your code...

window.menu = () => {
  let dropDown = document.getElementById('dropDown');
  let profile = document.getElementById('menuBar');
  if (profile.style.display === 'none' || profile.style.display === '') {
    profile.style.display = 'block';
    dropDown.style.transform = 'rotate(180deg)';
  } else {
    profile.style.display = 'none';
    dropDown.style.transform = 'rotate(0deg)';
  }
};

window.logOut = () => {
  logOut();
};
