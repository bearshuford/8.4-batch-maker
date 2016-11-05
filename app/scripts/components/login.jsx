import React from 'react';

import {Paper, RaisedButton} from 'material-ui'

import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';




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
      <Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
        onInvalidSubmit={this.notifyFormError}
      >
        <FormsyText
          name="username"
          required
          hintText=""
          floatingLabelText="username"
        />
        <FormsyText
          name="password"
          type="password"
          required
          floatingLabelText="password"
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

  handleSignUp: function(userData){
    console.log('handlesignup');
  },

  handleLogin: function(userData){
    console.log('handlelogin');
  },

  render: function(){
    return(
    <div style={styles.login}>
      <Paper style={styles.paper}>
        <h3 style={styles.header}>Sign Up</h3>
        <UserForm label="Sign Up" handleSubmit={this.handleSignUp}/>
      </Paper>
      <Paper style={styles.paper}>
          <h3 style={styles.header}>Log In</h3>
        <UserForm label="Login" handleSubmit={this.handleLogin}/>
      </Paper>
    </div>
    );
  }
});

export default Login;
