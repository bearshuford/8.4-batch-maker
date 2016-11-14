import $ from 'jquery';
import Backbone from 'backbone';

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',

  save: function(key, val, options){
    // delete this.attributes.createdAt;
    // delete this.attributes.updatedAt;

    var sessionToken = localStorage.getItem('sessionToken');
    console.log(sessionToken);
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'mightylowlands'),
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'bookshelf'),
        xhr.setRequestHeader('X-Parse-Session-Token', sessionToken);
      }
    });


    return Backbone.Model.prototype.save.apply(this, arguments);
  }
});

export default ParseModel;
