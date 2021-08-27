import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAWSyt5m4hKB83QcvkkfTJSkh4FqsldiHo",
  authDomain: "vaccine-life.firebaseapp.com",
  projectId: "vaccine-life",
  storageBucket: "vaccine-life.appspot.com",
  messagingSenderId: "100251786657",
  appId: "1:100251786657:web:58473ac8eaad1a1fd2bfe0",
  measurementId: "G-MBWL751PPY",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
