import $ from 'jquery';
import _ from 'underscore';
import React from 'react';

import {Paper, RaisedButton, Snackbar, Divider} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var Fraction = require('fractional').Fraction;

import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';


import Recipe from './../models/recipe.js'


const styles = {
  table: {
    width: 400,
    padding: 20,
    maxWidth: "90%",
    margin: '12px auto',
    marginTop: -68,
    position: 'relative',
    zIndex: 3000
  },
  form: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
    marginBottom: 8,
    marginTop: 0,
  },
  yieldGroup: {
    width: 136
  },
  divider: {
    marginLeft: -20,
    marginRight: -20
  },
  numberField: {
    width: 50,
    fontSize: 24,
    fontWeight: 500,
    textAlign: 'center'
  },
  name: {
    width: '100%',
    fontSize: 28,
    fontWeight: 'normal',
    fontFamily: '"Roboto", sans-serif',
    marginBottom: 8,
    marginRight: 4,
    marginTop: 0
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
  },
  ingredientsLabel: {
    
  }

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

    <Paper style={styles.table}>
      <h3 style={styles.name}>{original.get('name')}</h3>
      <Divider style={styles.divider}/>
      <AdjustRecipeForm
        handleSubmit={this.handleSubmit}
        yield={original.get('yieldNumber')}
        servings={original.get('yieldName')}
      />
    <Divider inset={true}/>

  <h3 style={styles.ingredientsLabel}>ingregients</h3>

        <IngredientList recipe={adjusted ? adjusted : original}/>

      <Snackbar
        open={this.state.open}
        message="Ingredient amounts updated."
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose}
      />
  </Paper>
    )
  }


});


export default AdjustRecipe;
