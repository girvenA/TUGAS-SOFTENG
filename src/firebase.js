import {initializeApp} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyCgPxJyhMUZ0MgirfUagBuciHvauJrwEaM",
    authDomain: "software-engineering-pro-d2628.firebaseapp.com",
    databaseURL: "https://software-engineering-pro-d2628-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "software-engineering-pro-d2628",
    storageBucket: "software-engineering-pro-d2628.appspot.com",
    messagingSenderId: "935345042159",
    appId: "1:935345042159:web:174d9421421e9ba54c211a",
    measurementId: "G-5E71TFP1X5"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId)
    messageDiv.innerHTML=message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity
    },5000)

}
//const auth = firebase.auth();
//const database = firebase.database();


const signUp=document.getElementById('register-button')
signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
    const db =getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            username : username,
            email : email
        };
        showMessage('Account Created Succesfully', 'signUpMessage')
        const docRef = doc(db, 'users', user.uid)
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html'
        })
        .catch((error)=>{
            console.error("error writing documents!", error)

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if (errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already in Use!', 'signUpMessage');
        }else{
            showMessage('Unable to Create User!', 'signUpMessage');
        }
    })
})


