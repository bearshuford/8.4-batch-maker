import React from 'react';

import {Paper, RaisedButton} from 'material-ui'

import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';

import User from './../models/User';




const styles = {
  login: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center'
  },
  header: {
    marginBottom: 4,
    marginTop: 4
  },
  paper: {
    width: 300,
    margin: '10px 20px',
    padding: 20
  },
  submit: {
    marginTop: 32
  }

};



var UserForm = React.createClass({

  getInitialState: function(){
    return { canSubmit: false }
  },

  enableButton: function() {
    this.setState({canSubmit: true});
  },

  disableButton: function() {
    this.setState({
      canSubmit: false
    });
  },

  submitForm: function(data) {
    console.log(data);
    this.props.handleSubmit(data);

  },

  render: function() {
    return (
      <Formsy.Form ref="form"
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
        onInvalidSubmit={this.notifyFormError}
      >
        <FormsyText
          name="username"
          type="text"
          floatingLabelText="username"
          required
        />
        <FormsyText
          name="password"
          type="password"
          floatingLabelText="password"
          required
        />
        <RaisedButton
          style={styles.submit}
          type="submit"
          label={this.props.label}
          disabled={!this.state.canSubmit}
          secondary={true}
        />
      </Formsy.Form>
		);
  }
});






var Login = React.createClass({

  getInitialState: function(){
    var user = new User();
    return{user: user};
  },

  handleFailedLogin: function(){
    console.log('failed login');
  },

  handleSignUp: function(userData){
    this.state.user.signup(userData.username, userData.password);
    console.log('handlesignup', userData);
    if(localStorage.getItem('sessionToken') !== null){
      this.props.router.navigate('batch', {trigger: true});
      console.log('navigating to batch');
    }
  },

  handleLogin: function(userData){
    this.state.user.login(userData.username, userData.password);
    if(localStorage.getItem('sessionToken') !== null){
      this.props.router.navigate('batch', {trigger: true});
    }
    else {
      this.handleFailedLogin();
    }
  },

  render: function(){
    return(
    <div style={styles.login}>
      <Paper style={styles.paper}>
        <h3 style={styles.header}>Sign Up</h3>
        <UserForm
          label="Sign Up"
          handleSubmit={this.handleSignUp}
          />
      </Paper>
      <Paper style={styles.paper}>
          <h3 style={styles.header}>Log In</h3>
        <UserForm
          label="Log In"
          handleSubmit={this.handleLogin}
          />
      </Paper>
    </div>
    );
  }
});

export default Login;
