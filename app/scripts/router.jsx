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
    'batch': 'batch'
  },

  initialize: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");
      }
    });
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
    ReactDOM.render(
      <App router={this}>
        <Batch router={this}/>
      </App>,
      document.getElementById('root')
    );
  }

});

var Router = new AppRouter();

export default Router;
