import _ from 'underscore';
import Backbone from 'backbone';

var Fraction = require('fractional').Fraction;

var Recipe = Backbone.Model.extend({
	idAttribute: 'objectId',

	defaults: {
		name: '',
		yieldName: 'servings',
		yieldNumber: 1,
		ingredients: []
  },

	adjust: function(qty){
		var yieldNumber = this.get('yieldNumber');
		var ratio = new Fraction(qty).divide(yieldNumber);

		console.log('ratio',ratio);

		var ingred = _.map(this.get('ingredients'),_.clone);	// clone for a new reference
		ingred.forEach(function(ingr){
			 ingr.qty = new Fraction(ingr.qty).multiply(ratio).toString();
		});
		this.set({
			'ingredients': ingred,
			'yieldNumber': qty
		});

	}

});




export default Recipe;
