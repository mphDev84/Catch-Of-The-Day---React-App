import Rebase from 're-base';//this package allows us to mirror our state to firebase 
import firebase from 'firebase';//original firebase package

const firebaseApp = firebase.initializeApp({
    
        apiKey: "AIzaSyAb7ZCJxjDDLme2ASPol7cS-APCECUoxsU",
        authDomain: "catch-of-the-day--matt-howels.firebaseapp.com",
        databaseURL: "https://catch-of-the-day--matt-howels-default-rtdb.firebaseio.com",
});

//create a Rebase:
const base = Rebase.createClass(firebaseApp.database());//'.database' is a function that will return our DB

//named export 
export {firebaseApp};

//default export
export default base;
