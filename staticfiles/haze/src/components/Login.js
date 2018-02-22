import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/Login.css'




class Login extends Component {

login(e) {
        window.location ='/'+login+'/';
  }


  

  render() {

  return(
<div className = "cover">
<div className="container" >
  <div className="row">
    <div className="col-lg-12">
      <div id="content">
        
        <div className="col-lg-6">
        <h1 id="h1">H A Z E</h1>
        <h3 id="h3">Taste the Music</h3>
        <hr id="hr"/>
        <button id="login_button" type="button"  onClick={this.login}  className="btn btn-success">Login with Spotify</button>
        </div>
       
      </div>    
    </div>
  </div>
</div>
</div>
  );
  }
  }

export default Login;

