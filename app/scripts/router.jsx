import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';

import App from './components/app.jsx'


var AppRouter = Backbone.Router.extend({

  routes: {
    '': 'index',
  },

  index: function(){
    ReactDOM.render(
      (<App router={this}/>),
      document.getElementById('app')
    );
  }

});

var Router = new AppRouter();

export default Router;
