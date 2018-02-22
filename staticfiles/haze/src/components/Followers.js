import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import AppHeader from '../components/AppHeader.js'
import * as firebase from 'firebase'

class Followers extends Component {


constructor(props) {
    super(props);

    this.state = {
      data: [],
      datax:[],
      followers:[] 
    };  




  }





 componentDidMount(){


   firebase.database().ref(this.props.match.params.user_id).on("value", snapshot => {
  
     
      this.setState({
        followers : snapshot.val()
      })
    })

   
   //for (var i=0; i < Object.keys(this.state.followers).length; i++) {
     
      //}
  }

  componentWillMount(){


  }


  render() {


    
    console.log(this.state.data)

    console.log(Object.keys(this.state.followers))
    //console.log(this.state.datax)


   const followers_list = Object.keys(this.state.followers).map((el,index) =>{
    
  for (var i=0; i < Object.keys(this.state.followers).length; i++) {
      if(el == Object.keys(this.state.followers)[i]){

     axios
        .get('http://127.0.0.1:8000/haze/restapi/user/'+el+'/')
       .then(({ data })=> {       
         localStorage.setItem('followersx'+el,JSON.stringify(data));
       })
       .catch((err)=> {})   

    return(
    
     <div className="d-flex justify-content-center" key={index} id="followerspage-div">
        <div className="container" id="followers-container">
           <div className="card text-center" id="followerspage-card">
             <div className="card-body">
              <div className="card-header" id="followers-card-header"> 
               <Link to={'/userprofile/'+el} >
                <ul className="list-group">   
                   <li className="list-group-item"  key={index}>
                        <div className="col-xs-12 col-sm-3">
                            <img src={JSON.parse(localStorage['followersx'+el]).user_image} alt="" className="img-responsive img-circle" width="100px" />
                        </div>
                        <div className="col-xs-12 col-sm-9">
                            <span className="name">{JSON.parse(localStorage['followersx'+el]).user_name}</span><br/>
                        </div>             
                   </li>           
                </ul>
               </Link>
             </div>
            </div>
          </div>
        </div>
      </div>
    
)} }} );


  return(
    <div>
    <AppHeader />
    {followers_list}
    </div>
  )
  }
}
export default Followers;


