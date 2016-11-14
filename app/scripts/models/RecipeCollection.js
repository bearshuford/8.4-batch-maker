import Backbone from 'backbone';

import Recipe from './Recipe.js';
import ParseCollection from './ParseCollection'

var RecipeCollection = ParseCollection.extend({
   model: Recipe,
   url: 'https://mighty-lowlands.herokuapp.com/parse/classes/Recipe'

});

export default RecipeCollection;
