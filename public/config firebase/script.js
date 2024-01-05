
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword ,  signOut , signInWithPopup, FacebookAuthProvider} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, collection, getDocs , addDoc
   , doc , getDoc , query , where ,setDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js"


const firebaseConfig = {
  apiKey: "AIzaSyDtsQ1bVAPZi5cMkegC-MTBFjBoZV9HwyU",
  authDomain: "olx-ecommerce-c175d.firebaseapp.com",
  projectId: "olx-ecommerce-c175d",
  storageBucket: "olx-ecommerce-c175d.appspot.com",
  messagingSenderId: "23772319235",
  appId: "1:23772319235:web:2c3c11b4446d3657010836",
  measurementId: "G-Y4SMM1EJKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();



function register(user){
  const{phoneNumber, email ,password , fullName} = user
  createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const user = userCredential.user.uid;
    console.log(user.uid)
    try {
      const docRef = await setDoc(doc(db, "users",user.uid), {
          email,
          phoneNumber,
          fullName,
        });
        alert('registered successfully')
        // console.log('document written with Id', docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage)
    
  });
}

function onLogIn(user){
    const{email ,password} = user

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   const user = userCredential.user;
    
   alert('login Successfully')
    window.location.replace("../src/olx landing page/olx.html")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}


async function  logInWithFacebook(){
  try{
  const provider = new FacebookAuthProvider();
 const result =  await signInWithPopup(auth, provider)
 console.log(result)
}catch(e){
  console.log(e.message)
}
}
async function getAds() {
  const querySnapshot = await getDocs(collection(db, "ads"))
  const ads = []
  querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      // const ad = { id: doc.id, ...doc.data() }
      const ad = doc.data()
      ad.id = doc.id
      ads.push(ad)
  });
  return ads
}

async function getSingleAd(adId) {
  const docRef = doc(db, "ads", adId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      const ad = docSnap.data()
      return ad
  } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
  }
}

async function getMyAdsFromDb(uid) {
  const adsRef = collection(db, "ads")
  const querySnapshot = await getDocs(query(adsRef, where("uid", "==", uid)))
  const ads = []
  querySnapshot.forEach((doc) => {
      const ad = doc.data()
      ad.id = doc.id

      ads.push(ad)
  });
  return ads
}


async function postAdToDb(ad) {
  /*
  1. Upload image to Storage
  2. Get the URL of the image
  3. Add all data with URL in database
  */ 
  try {
      const storageRef = ref(storage, `ad/${ad.image.name}`);
      await uploadBytes(storageRef, ad.image)  
      const url = await getDownloadURL(storageRef)
      ad.image = url 
      await addDoc(collection(db, "ads"), ad)
      alert('Data added successfully!')
    } catch (e) {
      alert(e.message)
  } 
}

async function getUser(uid) {
  console.log('uid', uid)
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  console.log(docSnap)
  if (docSnap.exists()) {
      const user = docSnap.data()
      return user
  } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
  }
}


async function searchInAds(inputValue) {
  const adsRef = collection(db, "ads")
  const querySnapshot = await getDocs(query(adsRef, where("title", "==", inputValue)))
  const ads = []
  querySnapshot.forEach((doc) => {
      const ad = doc.data()
      ad.id = doc.id
      ads.push(ad)
  });

  return ads
}


function logOut(){
  return signOut(auth)
}

export{
    register,
    onLogIn, 
    auth,
    logOut,
    postAdToDb,
    getAds,
    getSingleAd,
    getUser,
    logInWithFacebook,
    getMyAdsFromDb,
    searchInAds,
}