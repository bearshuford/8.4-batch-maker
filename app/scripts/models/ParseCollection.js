import $ from 'jquery';
import Backbone from 'backbone';

var ParseCollection = Backbone.Collection.extend({
  whereClause: {field: '', className: '', objectId: ''},
  parseWhere: function(field, className, objectId){
    this.whereClause = {
      field: field,
      className: className,
      objectId: objectId,
      '__type': 'Pointer'
    };

    return this;
  },
  url: function(){
    var url = this.baseUrl;

    if(this.whereClause.field){
      var field = this.whereClause.field;
      delete this.whereClause.field;
      url += '?where={"' + field + '":' + JSON.stringify(this.whereClause) + '}';
    }

    return url;
  },
  parse: function(data){
    return data.results;
  }



});

export default ParseCollection;
