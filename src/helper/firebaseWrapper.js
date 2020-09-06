import * as firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBgw1TM-bPmqL9cPvev_JXNe2cfBHVGDlY",
    authDomain: "covid-symptom-colect.firebaseapp.com",
    databaseURL: "https://covid-symptom-colect.firebaseio.com/",
    projectId: "covid-symptom-colect",
    storageBucket: "covid-symptom-colect.appspot.com",
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();
export const auth = firebase.auth();
