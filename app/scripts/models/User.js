import $ from 'jquery';
import Backbone from 'backbone';

var User = Backbone.Model.extend({
	idAttribute: 'objectId',
   urlRoot: 'https://mighty-lowlands.herokuapp.com/parse/users',

  signup: function(username, password){
    var self = this;
    this.save({username: username, password: password}).then(function(response){
      console.log(response);
      localStorage.setItem('username',username);

      if(response.sessionToken){
        localStorage.setItem('sessionToken', response.sessionToken);
        localStorage.setItem('userId', response.objectId);

        $.ajaxSetup({
          beforeSend: function(xhr){
            xhr.setRequestHeader('X-Parse-Application-Id', 'mightylowlands'),
            xhr.setRequestHeader('X-Parse-REST-API-Key', 'bookshelf'),
            xhr.setRequestHeader('X-Parse-Session-Token', response.sessionToken);
          }
        });
      }
      console.log('navigating');
      Backbone.history.navigate('recipes', {trigger: true});
    });
  },

  login: function(username, password){
    var url = 'https://mighty-lowlands.herokuapp.com/parse/login';
    var self = this;

    $.get(url+'?username='+username+'&password='+encodeURI(password)).then(function(response){
      localStorage.setItem('username',username);
      localStorage.setItem('sessionToken', response.sessionToken);
      localStorage.setItem('userId', response.objectId);

      $.ajaxSetup({
        beforeSend: function(xhr){
          xhr.setRequestHeader('X-Parse-Application-Id', 'mightylowlands'),
          xhr.setRequestHeader('X-Parse-REST-API-Key', 'bookshelf'),
          xhr.setRequestHeader('X-Parse-Session-Token', response.sessionToken);
        }
      });
    Backbone.history.navigate('recipes', {trigger: true});

    });
    return this;
  },

  logout: function(){
    var url = 'https://mighty-lowlands.herokuapp.com/parse/logout';
    var self = this;

    var token = localStorage.getItem('sessionToken');
    localStorage.clear();

    $.post(url).then(function(response){
      // Backbone.history.navigate('login', {trigger: true})
      console.log('signed out');
    });
    Backbone.history.navigate('login', {trigger: true})
    return this;
  }
});

export default User;
