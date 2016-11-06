import $ from 'jquery';
import _ from 'underscore';
import React from 'react';

import {Paper, RaisedButton} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var Fraction = require('fractional').Fraction;

import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';


import Recipe from './../models/recipe.js'


const styles = {
  table: {
    width: 500,
    maxWidth: "90%",
    margin: '12px auto'
  },
  qty: {
    width: 60,
    overflow: 'visible'
  },
  form: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 4
  },
  formInput: {
    display: 'inline-block'
  },
  fraction: {
    display: 'inline-flex',
    flexDirection: 'column',
    padding: '1em',
    alignItems: 'center'
  },
  numerator: {
    borderBottom: '2px solid grey'
  }

};


const recipe = {
  name: 'Curried Lentils and Rice',
  	yieldName: 'servings',
  	yieldNumber: 10,
  	ingredients: [ {
  	    qty: '1',
  	    um: 'quart',
  	    name: 'beef broth'
  	  }, {
  	    qty: '1',
  	    um: 'cup',
  	    name: 'dried green lentils'
  	  }, {
  	    qty: '1/2',
  	    um: 'cup',
  			name: 'basmati rice'
  	  }, {
  	    qty: '1',
  	    um: 'tsp',
  	    name: 'curry powder'
  	  }, {
  	    qty: '1',
  	    um: 'tsp',
  		  name: 'salt'
  		}
  ],
};




var IngredientList = React.createClass({
  render: function(){
    var ingredients = this.props.recipe.get('ingredients').map(function(ingr,i){
      return(
        <TableRow key={i}>
          <TableRowColumn style={styles.qty}>{ingr.qty}</TableRowColumn>
          <TableRowColumn>{ingr.um}</TableRowColumn>
          <TableRowColumn>{ingr.name}</TableRowColumn>
        </TableRow>
      )
    });
    return (

        <Table multiSelectable={true}>
          <TableBody>
            {ingredients}
          </TableBody>
        </Table>

    );
  }


});




var AdjustRecipeForm = React.createClass({

  submitForm: function(data){
    this.props.handleSubmit(data.yield);
  },


  render: function(){
    return (

      <Formsy.Form style={styles.form}
          onValidSubmit={this.submitForm}
        >
          <FormsyText style={styles.formInput}
            name="yield"
            type="number"
            required
            maxLength={3}
            value={this.props.yield}
            floatingLabelText="Makes"
          />
          <RaisedButton style={styles.formInput}
            type="submit"
            label="Adjust"
            secondary={true}
          />
        </Formsy.Form>

    )
  }
});


var AdjustRecipe = React.createClass({

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
    <Paper style={styles.table}>
      <AdjustRecipeForm
        handleSubmit={this.handleSubmit}
        yield={this.props.recipe.get('yieldNumber')}
        servings={this.props.recipe.get('yieldName')}
      />
      <IngredientList
      recipe={adjusted ? adjusted : original}
      />
    </Paper>
    )
  }


});


export default AdjustRecipe;
