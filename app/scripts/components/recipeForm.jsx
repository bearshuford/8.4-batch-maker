import $ from 'jquery';
import _ from 'underscore';
import React from 'react';

import {Paper, RaisedButton, Divider} from 'material-ui';

import Formsy from 'formsy-react';
import {FormsyText, FormsySelect} from 'formsy-material-ui/lib';


import Recipe from './../models/recipe.js'


const styles = {
  app: {
    width: 600,
    maxWidth: "90%",
    margin: '12px auto'
  },
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    marginBottom: 8
  },
  ingredientGroup: {
    display:'flex',
    flexFlow: 'row nowrap'
  },
  formRow: {
    display:'flex',
    flexFlow: 'row nowrap'
  }


};


var IngredientFormGroup = React.createClass({
  render: function(){
    return (
      <div style={styles.ingredientGroup}
        <FormsyText style={}
          inputStyle={}
          floatingLabelText="amount"
          name="amount"
          type="number"
        />
        <FormsySelect
          name="um"
          floatingLabelText="Unit"
          menuItems={this.selectFieldItems}
        >
          <MenuItem value={'Cups'} primaryText="Cups" />
          <MenuItem value={'Tbs'} primaryText="Tbs" />
          <MenuItem value={'Tsp'} primaryText="Tsp" />
          <MenuItem value={'oz'} primaryText="oz" />
          <MenuItem value={'lbs'} primaryText="lbs" />
          <MenuItem value={'lbs'} primaryText="lbs" />
        </FormsySelect>
        <FormsyText style={}
          inputStyle={}
          hintText="amount"
          name="name"
          floatingLabelText="Ingredient"
        />


      </div>
    )
  };
});



var RecipeForm = React.createClass({

  getInitialState: function(){
    var ingredients = [];
    ingredients.push(<IngredientFormGroup/>);
    ingredients.push(<IngredientFormGroup/>);

    return {
      ingredients: ingredients
    };
  }

  submitForm: function(data){
    this.props.handleSubmit(data);
  },



  addIngredient: function(){
    this.setState({
      ingredients: ingredients.concat(<IngredientFormGroup/>)
    })
  }

  render: function(){
    return (
      <Formsy.Form style={styles.form}
          onValidSubmit={this.submitForm}
        >
          <div style={styles.formRow}>
            <FormsyText style={}
              inputStyle={}
              floatingLabelStyle={}
              floatingLabelText="Recipe Name"
              name="title"
              required
              autoFocus
            />
          </div>
          <div style={styles.formRow}>
            <span>This recipe will make</span>
            <FormsyText style={}
              floatingLabelText="Amount"
              name="yieldNumber"
              required
            />

            <FormsyText style={}
              hintText="cookies, loaves, etc"
              name="yieldNumber"
            />
          </div>

          {this.state.ingredients}
          <RaisedButton
            style={styles.adjustButton}
            type="submit"
            label="Save"
            secondary={true}
          />
        </Formsy.Form>
    )
  }
});


var RecipeFormContainer = React.createClass({

  getDefaultProps: function(){
    var rec = new Recipe(recipe);
    return {
      recipe: rec
    };
  },

  getInitialState: function(){
    return {
      adjustedRecipe: false
    };
  },


  handleSubmit: function(qty){
    console.log('adjustRecipe - handleSubmit');
    console.log('qty',qty);

    var adjustedRecipe = new Recipe(this.props.recipe.toJSON());
    adjustedRecipe.adjust(qty);

    this.setState({'adjustedRecipe': adjustedRecipe});
  },

  handleReset: function(){
    this.setState('adjustedRecipe', false);
  },


  render: function(){
    var original = this.props.recipe;
    var adjusted = this.state.adjustedRecipe;
    return (
    <div style={styles.table}>
      <h3 style={styles.name}>{original.get('name')}</h3>
      <RecipeForm
        handleSubmit={this.handleSubmit}
      />
      <Paper>
        <IngredientList recipe={adjusted ? adjusted : original}/>
      </Paper>
    </div>
    )
  }


});


export default RecipeFormContainer;
