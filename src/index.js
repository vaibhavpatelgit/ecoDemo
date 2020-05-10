import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDQOt-mBvZhwTriFV3m6a8K58gl34hhics",
  authDomain: "ecommerce-demo-c9d99.firebaseapp.com",
  databaseURL: "https://ecommerce-demo-c9d99.firebaseio.com",
  projectId: "ecommerce-demo-c9d99",
  storageBucket: "ecommerce-demo-c9d99.appspot.com",
  messagingSenderId: "934009261732",
  appId: "1:934009261732:web:c5f2317e6aafdbb2b6a031",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
