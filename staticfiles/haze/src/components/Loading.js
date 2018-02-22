import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import '../css/MainPage.css'
import * as firebase from 'firebase'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';



class Loading extends Component {


    constructor(props) {
    super(props);

    this.state = {
       data : [],
       datax : [],
       formData: {},
       followings:{}
    };





    var client_id = '6b352da8a18849318a10dbe3b35d0b42'; // Your client id
    var client_secret = 'ee13701c42474b8da03f1f385d8e41e5'; // Your secret
    var redirect_uri = 'http://127.0.0.1:8000/mainpage/'; // Your redirect uri
    var access_token = new URL(window.location.href).hash.split('&').filter(function(el) { if(el.match('access_token') !== null) return true; })[0].split('=')[1];
    var url = window.location.href;
    access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
    localStorage.setItem('access_token',access_token);
    localStorage.setItem('client_id',client_id);
    localStorage.setItem('client_secret',client_secret);





    /*fetch("https://accounts.spotify.com/api/token/", {
            method: 'POST',
            headers: {
               'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            redirect_uri: redirect_uri,
             form: {
      grant_type: 'client_credentials'
    },
      mode: 'cors',
    json: true
        }).then(function (response) {

     });*/

      axios
      .get('https://api.spotify.com/v1/me/?format=json',{
         method: 'GET',
         headers: { 'Authorization': 'Bearer ' +  localStorage.getItem('access_token') },
      })
      .then(({ data })=> {
        this.setState({
          data: [data],
          formData: {
                user_id: data.id,
                user_name: data.display_name,
                email: data.email,
                user_image: data.images[0].url,
                country: data.country
                    }
        });
        localStorage.setItem('user_id',data.id);
        fetch("http://127.0.0.1:8000/haze/restapi/user/", {
            method: 'POST',
            headers: {
                'Authorization': 'Basic '+btoa('admin:12345678.'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.formData)

        }).then(function (response) {


        });
        console.log(data)
      })
      .catch((err)=> {})


      axios
    .get('http://127.0.0.1:8000/haze/restapi/post/')
    .then(({ data })=> {
      this.setState({
          datax: data.reverse()
      }); 

      })
      .catch((err)=> {})   


    

    }


   componentDidMount(){

    
    firebase.database().ref(localStorage['user_id']).child(localStorage['user_id']).set({
    id: localStorage['user_id']
    }); 
      
   firebase.database().ref(localStorage['user_id']).on("value", snapshot => {
  
      var ttt = snapshot.val()
      this.setState({
        followings : snapshot.val()
      })
    })

    

  }

  componentWillMount(){

    


      
    console.log("a"+this.state.followings)   
   
    console.log(this.state.data+"weew")
    console.log(this.state.formData)


  


  


     
  }


  render() {


  return(
    <div className="content-main" role="main" id="content-main" >
      <div className="container" id="loading-container">
        <h1>Spotify Terms and Conditions of Use</h1>
          <p>
              1. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s1">Introduction</a> <br></br>
              2. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s2">Changes to the Agreements</a><br></br>
              3. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s3">Enjoying Spotify</a><br></br>
              4. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s4">Rights we grant you</a><br></br>
              5. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s5">Third Party Applications</a><br></br>
              6. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s6">User-Generated Content</a><br></br>
              7. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s7">Rights you grant us</a><br></br>
              8. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s8">User guidelines</a><br></br>
              9. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s9">Infringement and reporting User Content</a><br></br>
              10. <a href="https://www.spotify.com/uk/legal/end-user-agreement/plain/#s10">Service limitations and modifications</a><br></br>
         </p>
        <button type="button" onClick={this.login} id="btn-accept" className="btn btn-success" >
        <Link to={'/mainpage/#access_token='+localStorage['access_token']+'&token_type=Bearer&expires_in=3600&state=s9D4QqwjQhlTz6HZ'}>
        ACCEPT
        </Link>
       </button>
      </div>
    </div>
  );
  }
  }


export default Loading;

