import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';

import App from './components/app.jsx'
import Login from './components/login.jsx'
import Batch from './components/adjustRecipe.jsx'
import List from './components/list.jsx'
import Item from './components/item.jsx'
import RecipeForm from './components/recipeForm.jsx'


var AppRouter = Backbone.Router.extend({

  routes: {
    '': 'index',
    'login': 'login',
    'batch': 'batch',
    'recipes/:id/edit': 'recipeAddEdit',
    'recipes/new': 'new',
    'recipes/:id': 'item',
    'recipes': 'list'

  },

  initialize: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "mightylowlands");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "bookshelf");
      }
    });
  },

  loginRedirect: function(){
    var loggedIn = (localStorage.getItem('sessionToken') !== null);
    console.log('loginRedirect');
    if(!loggedIn){
      this.navigate('login', {trigger: true});
    }
  },

  index: function(){
    ReactDOM.render(
      <App router={this}/>,
      document.getElementById('root')
    );
    this.loginRedirect();
  },

  login: function(){

    ReactDOM.render(
      <App router={this}>
        <Login router={this}/>
      </App>,
      document.getElementById('root')
    );
    var loggedIn = (localStorage.getItem('sessionToken') !== null);
    if(loggedIn){
      this.navigate('recipes', {trigger: true});
    }
  },

  batch: function(){

    ReactDOM.render(
      <App  router={this}>
        <Batch  router={this}/>
      </App>,
      document.getElementById('root')
    );

    this.loginRedirect();
  },

  list: function(){

      ReactDOM.render(
        <List/>,
        document.getElementById('root')
      );

    this.loginRedirect();
  },

  item: function(recipeId){

      ReactDOM.render(
        <Item  recipeId={recipeId}/>,
        document.getElementById('root')
      );

    this.loginRedirect();
  },

  new: function(){
    ReactDOM.render(
      <RecipeForm router={this}/>,
      document.getElementById('root')
    );

  this.loginRedirect();
  }
});

var Router = new AppRouter();

export default Router;
