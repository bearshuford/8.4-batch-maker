import Backbone from 'backbone';
import Recipe from './Recipe.js';

var RecipeCollection = Backbone.Model.extend({
   model: Recipe

});

export default RecipeCollection;
