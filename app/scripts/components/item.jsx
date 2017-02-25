import React from 'react';
import Backbone from 'backbone';

import {List, ListItem} from 'material-ui';

import Formsy from 'formsy-react';

import Recipe from './../models/Recipe';
import RecipeCollection from './../models/RecipeCollection';

import AdjustRecipe from './adjustRecipe.jsx';

import App from './app.jsx';

var RecipeItem = React.createClass({

  getInitialState: function(){
    return {
      recipe: new Recipe()
    };
  },

  componentWillMount: function(){
    var recipe   = this.state.recipe;
    var recipeId = this.props.recipeId;

    if(!recipeId){  // If no recipe, bail
      return;
    }

    recipe.set('objectId', recipeId);

    recipe.fetch().then(() => {
      this.setState({recipe: recipe});
    });
  },

  handleBack: function(){
    Backbone.history.navigate('recipes', {trigger: true});
  },

  render: function() {
    var recipe = this.state.recipe;
    return (
      <App handleBack={this.handleBack}>
        <AdjustRecipe recipe={recipe}/>
      </App>
		);
  }


});



export default RecipeItem;
