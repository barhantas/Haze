import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import '../css/AppHeader.css';

class AppHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

   componentDidMount(){

    var client_id = localStorage.getItem('client_id');
    var client_secret = localStorage.getItem('client_secret');
    var access_token = localStorage.getItem('access_token');


    axios
      .get('https://api.spotify.com/v1/me/?format=json',{
         method: 'GET',
         headers: { 'Authorization': 'Bearer ' + access_token },
      })
      .then(({ data })=> {
        this.setState({
          data: [data]
        });
      })
      .catch((err)=> {})
  
  }


  render() {

    const current_user = this.state.data.map((el, index) => {
      return (<div>
            <img id="user_pic" src={el.images[0].url} alt=""/> &nbsp;{el.display_name}
            </div>
   )});



  return(

<nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse ">
    <div className="container">
      <div className="navbar-header"> 
     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
        <a className="navbar-brand" href={'/mainpage/#access_token='+localStorage['access_token']+'&token_type=Bearer&expires_in=3600&state=s9D4QqwjQhlTz6HZ'}>Home</a>
        </div> 
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="nav navbar-nav">
                <li className="nav-item"><a className="nav-link" href="/profile/">Profile</a></li>
                <li className="nav-item"><a className="nav-link" href="/discover/">Discover</a></li>
                <li className="nav-item"><a className="nav-link" href="/search/">User Search</a></li>
          </ul>
          <ul className="nav navbar-nav ml-auto">
                <li className="nav-item"><a className="nav-link" href="/profile/">{current_user}</a></li>
                <li className="nav-item"><a className="nav-link" href="https://accounts.spotify.com">Log out</a></li> 
          </ul> 
      </div> 
    </div> 
</nav>

 

  )
  }
}
export default AppHeader;


