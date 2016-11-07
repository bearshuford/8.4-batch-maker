import $ from 'jquery';
import _ from 'underscore';
import React from 'react';

import {Paper, RaisedButton, Snackbar} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var Fraction = require('fractional').Fraction;

import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';


import Recipe from './../models/recipe.js'


const styles = {
  table: {
    width: 400,
    maxWidth: "90%",
    margin: '12px auto'
  },
  form: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
    marginBottom: 8
  },
  yieldGroup: {
    width: 136
  },
  numberField: {
    width: 50,
    fontSize: 24,
    fontWeight: 500,
    textAlign: 'center'
  },
  name: {
    width: '100%',
    fontSize: 32,
    fontWeight: 'normal',
    fontFamily: '"Roboto", sans-serif',
    marginBottom: 8,
    marginRight: 4
  },
  servings: {
    fontFamily: '"Lobster", cursive',
    position: 'relative',
    fontSize: 22,
    left: -78
  },
  makes: {
    fontSize: 24,
    top: 34
  },
  adjustButton: {
    marginTop: 18,
  },
  qty: {
    width: 60,
    overflow: 'visible'
  },
  um: {
    width: 100,
    overflow: 'visible'
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
          <TableRowColumn style={styles.um}>{ingr.um}</TableRowColumn>
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

  /* focus on yieldName span click */
  handleFocus: function(){
    this.refs.item.focus();
  },


  render: function(){
    return (
      <Formsy.Form style={styles.form}
          onValidSubmit={this.submitForm}
        >
          <div>
            <FormsyText style={styles.yieldGroup}
              inputStyle={styles.numberField}
              floatingLabelStyle={styles.makes}
              floatingLabelText="Makes"
              name="yield"
              type="number"
              value={this.props.yield}
              ref="item"
              required
              autoFocus
            />
          <span
            style={styles.servings}
            onTouchTap={this.handleFocus}
          >
            {this.props.servings}
          </span>
          </div>
          <RaisedButton
            style={styles.adjustButton}
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
      adjustedRecipe: false,
      open: false   /* snackbar */
    };
  },


 handleRequestClose: function() {
    this.setState({
      open: false,
    });
  },


  handleSubmit: function(qty){
    var adjustedRecipe = new Recipe(this.props.recipe.toJSON());
    adjustedRecipe.adjust(qty);

    this.setState({
      'adjustedRecipe': adjustedRecipe,
      open: true
    });
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
      <AdjustRecipeForm
        handleSubmit={this.handleSubmit}
        yield={original.get('yieldNumber')}
        servings={original.get('yieldName')}
      />
      <Paper>
        <IngredientList recipe={adjusted ? adjusted : original}/>
      </Paper>
      <Snackbar
        open={this.state.open}
        message="Ingredient amounts updated."
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />
    </div>
    )
  }


});


export default AdjustRecipe;
