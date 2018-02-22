import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import '../css/MainPage.css'
import AppHeader from '../components/AppHeader.js'
import * as firebase from 'firebase'



class MainPage extends Component {


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

     firebase.database().ref(localStorage['user_id']).on("value", snapshot => {
       localStorage.setItem('followersxx',JSON.stringify(snapshot.val()));
    })

  }

  componentWillMount(){

    


      
        console.log("a"+this.state.followings)   
   
    console.log(this.state.data+"weew")
    console.log(this.state.formData)


  


  


     
  }


  render() {


    
console.log(this.state.followings)

console.log(Object.keys(this.state.followings))

 for (var i=0; i < Object.keys(this.state.followings).length; i++) {
       console.log(Object.keys(this.state.followings)[i])
    } 

    
   

  const post_list = this.state.datax.map((el,index) =>{
  for (var i=0; i < Object.keys(this.state.followings).length; i++) {
      if(el.post_user == Object.keys(this.state.followings)[i]){
        console.log(el)
    return(


<div className="card">  
  <div className="d-flex justify-content-center" key={index} id="mainpage-div">
    <div className="container" id="mainpage-container">
      <div className="card-header">  
        <p>
        <img id="post_pic" src={el.post_user_image} alt=""/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{el.post_user_name}</strong>
            
        </p>
         
        

          <div className="card text-left" id="mainpage-card">
            <div className="card-block" id="mainpage-cardblock">
             <div className="card-body" id="card-body"> 
               <img className="img-fluid img-thumbnail" src={el.post_image} alt=""/>
               <p>  <audio className='audioX' controls><source src={el.post_url} type="audio/mpeg"/></audio></p>
             </div>
              <p>{el.post_artist} - {el.post_name}</p>
               <p>{el.post_comment}</p>
              <p>{el.created_at}</p>
           </div>
          </div>
       </div>
    </div> 
  </div>
</div>
)}} } );

  return(
    <div>
    <AppHeader />
    {post_list}
    </div>
  );
  }
  }


export default MainPage;

