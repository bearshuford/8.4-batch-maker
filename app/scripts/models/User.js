import $ from 'jquery';
import Backbone from 'backbone';

var User = Backbone.Model.extend({
	idAttribute: 'objectId',
   urlRoot: 'https://mighty-lowlands.herokuapp.com/parse/users',

  signup: function(username, password){
    var self = this;
    localStorage.setItem('username', username);
    this.save({username: username, password: password}).then(function(response){
      console.log(response);

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

    });
  },

  login: function(username, password){
    var url = 'https://mighty-lowlands.herokuapp.com/parse/login';
    var self = this;
    localStorage.setItem('username', username);

    $.get(url+'?username='+username+'&password='+password).then(function(response){

      localStorage.setItem('sessionToken', response.sessionToken);
      localStorage.setItem('userId', response.objectId);

      $.ajaxSetup({
        beforeSend: function(xhr){
          xhr.setRequestHeader('X-Parse-Application-Id', 'mightylowlands'),
          xhr.setRequestHeader('X-Parse-REST-API-Key', 'bookshelf'),
          xhr.setRequestHeader('X-Parse-Session-Token', response.sessionToken);
        }
      });
    });
    return this;
  },

  logout: function(){
    var url = 'https://mighty-lowlands.herokuapp.com/parse/logout';
    var self = this;

    var token = localStorage.getItem('sessionToken');
    localStorage.clear();
    $.post(url);
    return this;
  }
});

export default User;
