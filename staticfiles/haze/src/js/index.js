import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import App from './App';
import '../dist/css/bootstrap.min.css';
import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyApUeavPRAk7kwP9hqGWcUMr36e6UIcD_Y",
    authDomain: "haze-3bcc2.firebaseapp.com",
    databaseURL: "https://haze-3bcc2.firebaseio.com",
    projectId: "haze-3bcc2",
    storageBucket: "haze-3bcc2.appspot.com",
    messagingSenderId: "801883853623"
  };

var fire = firebase.initializeApp(config);
export default fire;


var obj = document.getElementById('root');
obj.style.height = "100%";

ReactDOM.render(<App />, document.getElementById('root'));



	