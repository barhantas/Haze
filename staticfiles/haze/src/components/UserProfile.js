import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import AppHeader from '../components/AppHeader.js'


import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import * as firebase from 'firebase'
import '../css/UserProfile.css'


class UserProfile extends Component {


constructor(props) {
    super(props);

    this.state = {
     data:[],
     datax:[],
     button_check: "",
     button_checkx: ""
    };



     this.follow = this.follow.bind(this);
      this.unfollow = this.unfollow.bind(this);



     

  

  }

   componentDidMount(){
    var client_id = localStorage.getItem('client_id');
    var client_secret = localStorage.getItem('client_secret');
    var access_token = localStorage.getItem('access_token');
     axios
        .get('http://127.0.0.1:8000/haze/restapi/user/'+ this.props.match.params.user_id +"/")
       .then(({ data })=> {
          this.setState({
           data: data
         });
          console.log(data)
          console.log(this.state.data)
         
       })
       .catch((err)=> {}) 


    axios
    .get('http://127.0.0.1:8000/haze/restapi/post/?format=json')
    .then(({ data })=> {
      this.setState({
          datax: data.reverse()
      }); 

      })
      .catch((err)=> {})  



     firebase.database().ref(this.props.match.params.user_id).on("value", snapshot => {
  
      this.setState({
        followers : snapshot.val()
      })
    })

     firebase.database().ref(localStorage['user_id']).on("value", snapshot => {
       localStorage.setItem('followersxx',JSON.stringify(snapshot.val()));
    })


   if(JSON.stringify(localStorage['followersxx']).includes(this.props.match.params.user_id) == true){
        console.log('a')
        this.setState({
         button_checkx: "",
         button_check: "hidden"
      });  

    }
  




    }   

  componentWillMount(){

    

    


    if(localStorage['user_id'] == this.props.match.params.user_id){
        this.setState({
         button_check: "hidden"
      });
      }





 
  /*  if(Object.keys(this.state.followers).includes(this.props.match.params.user_id)){
        this.setState({
          button_onClick=this.unfollow()

 })}
       */
   

  }

    follow (){

     firebase.database().ref(localStorage['user_id']).child(this.props.match.params.user_id).set({
    id: this.props.match.params.user_id
    });

    firebase.database().ref(localStorage['user_id']).on("value", function(snapshot) {  
    }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    })   

    location.reload();
   }

   unfollow(e) {

     firebase.database().ref(localStorage['user_id']).child(this.props.match.params.user_id).remove();

    firebase.database().ref(localStorage['user_id']).on("value", function(snapshot) {  
    }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    })   

    location.reload();
   }


  render() {
    console.log(this.state.followersx)




const profileCard = (
              <div className="card text-center">
              <div className="card-block">
                <div className="cardheader">

                </div>
                <div className="card-body">
                    <img alt="" src={this.state.data.user_image} />
                     <Link to={'/followings/'+this.state.data.user_id}>

              <h5 id="h5">Following : </h5>
              </Link>
                </div>
                
                <div className="card-text">
                    <div className="card-text">
                       <p>{this.state.data.user_name}</p>
                    </div>
                 <div className="card-body">
                   <button type="button" className="btn btn-success" onClick={() => this.follow()}  hidden={this.state.button_check} >Follow</button>
                   <button type="button" className="btn btn-success" onClick={() => this.unfollow()}  hidden={this.state.button_checkx} >Unfollow</button>
                </div>    
                    
                   <strong>@{this.state.data.user_id}</strong>
                </div>
                </div>
            
  </div>)
 

const user_posts = this.state.datax.map((el,index) =>{
  if(el.post_user == this.state.data.user_id)  
    return(
       <div className="col-lg-3 col-md-4 col-xs-6" key={index}>
          <a className="d-block mb-4 h-20">
            <img className="img-fluid img-thumbnail" src={el.post_image} alt=""/>
            <audio className='audioX' controls><source src={el.post_url} type="audio/mpeg"/></audio>
             <p>{el.post_artist} - {el.post_name}</p>
            <p>{el.created_at}</p>
          </a>  
       </div>
)});


  return(
    <div>
    <AppHeader />
    <div className="container">
     {profileCard}

  <div className="row text-center text-lg-left"> 
  {user_posts}
  </div>
  </div>
  </div>
  
  );
  }
  }

export default UserProfile;
