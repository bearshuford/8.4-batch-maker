import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';

import App from './components/app.jsx'
import Login from './components/login.jsx'
import Batch from './components/adjustRecipe.jsx'


var AppRouter = Backbone.Router.extend({

  routes: {
    '': 'index',
    'login': 'login',
    'batch': 'batch',
    'list': 'list'
  },

  initialize: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "mightylowlands");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "bookshelf");
      }
    });
  },

  execute: function(callback, args, name){
    var loggedIn = (localStorage.getItem('sessionToken') !== null);
    console.log('loggedin',(localStorage.getItem('sessionToken') !== null));

    setTimeout(function(){
      var loggedIn = (localStorage.getItem('sessionToken') !== null);
      console.log('timeout', loggedIn);
    },2000);

    if(!loggedIn && !name.includes('login')){
      this.navigate('login', {trigger: true});
      return false;
    }
    else{
      console.log('we good', args, name);
    }

    return Backbone.Router.prototype.execute.call(this, callback, args, name);
  },

  index: function(){
    ReactDOM.render(
      <App router={this}/>,
      document.getElementById('root')
    );
  },

  login: function(){
    ReactDOM.render(
      <App router={this}>
        <Login router={this}/>
      </App>,
      document.getElementById('root')
    );
  },

  batch: function(){
  /*  if(localStorage.getItem('sessionToken') !== null){ */
      ReactDOM.render(
        <App router={this}>
          <Batch router={this}/>
        </App>,
        document.getElementById('root')
      );
  /*  }
    else {
      this.navigate('login',{'trigger':true});
    } */
  },

  list: function(){
    if(localStorage.getItem('sessionToken') !== null){
      ReactDOM.render(
        <App router={this}>
          <Batch router={this}/>
        </App>,
        document.getElementById('root')
      );
    }
    else{
      this.navigate('login',{trigger:true});
    }
  }
});

var Router = new AppRouter();

export default Router;
