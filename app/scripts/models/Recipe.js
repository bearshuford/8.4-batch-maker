import _ from 'underscore';
import Backbone from 'backbone';
import ParseModel from './ParseModel'

var Fraction = require('fractional').Fraction;

var Recipe = ParseModel.extend({
	idAttribute: 'objectId',
	urlRoot: 'https://mighty-lowlands.herokuapp.com/parse/classes/Recipe',

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
