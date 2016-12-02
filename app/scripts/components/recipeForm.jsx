import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import React from 'react';

import {Paper, RaisedButton, Divider, MenuItem, IconButton} from 'material-ui';

import Formsy from 'formsy-react';
import {FormsyText, FormsySelect} from 'formsy-material-ui/lib';


import Recipe from './../models/recipe.js'
import App from './app.jsx'


const styles = {
  app: {
    width: 500,
    maxWidth: "90%",
    margin: '12px auto'
  },
  paper: {
	  padding: 20,
		marginTop: -70,
		zIndex: 2000,
		position: 'relative'
  },
  form: {
		display: 'flex',
    flexFlow: 'column nowrap',
    marginBottom: 8
  },
  formRow: {
    display:'flex',
    flexFlow: 'row nowrap',
		alignItems: 'center'
  },
	name: {
     fontSize: 22,
     fontWeight: 'normal',
     fontFamily: '"Roboto", sans-serif',
     marginLeft: 4
  },
  nameInput: {
	  fontSize: 30
  },
	makes: {
		fontSize: 22,
		fontFamily: '"Lobster", sans-serif',
	},
  none:  {
    marginTop: 0
  },
	yieldNumber: {
		marginLeft: 18,
		width: 68
	},
	yieldName: {
		marginLeft: 24,
		width: 180
	},
	qty: {
		width: 68,
		marginRight: 16
	},
	um: {
		width: 100,
		marginRight: 16
	},
	ingredient:{
		width: 200
	},
	addHeader:{
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'flex-start',
		alignItems: 'center',
      marginTop: 20
	},
	add: {
		marginLeft: 10,
		padding: 0
	},
	addIcon: {
		fontSize: 32,
		color: 'rgb(0, 188, 212)'
	},
	deleteIcon: {
		fontSize:24
	},
	submit:{
		width: 100,
		marginTop: 18
	}

};


var IngredientFormGroup = React.createClass({
	removeIngredient: function(){
		this.props.removeIngredient(this.props.pos)
	},

  render: function(){
		var i = this.props.surname;
    return (
      <div style={styles.formRow} >
        <FormsyText style={styles.qty}
          hintText="amount"
          name={'qty-' + i}
          type="number"
        />
        <FormsySelect
          name={'um-' + i}
          hintText="unit"
					style={styles.um}
        >
          <MenuItem value={'cups'} primaryText="cups" />
          <MenuItem value={'tbs'} primaryText="tbs" />
          <MenuItem value={'tsp'} primaryText="tsp" />
          <MenuItem value={'oz'} primaryText="oz" />
          <MenuItem value={'lbs'} primaryText="lbs" />
					<MenuItem value={'-'} primaryText="-" />
        </FormsySelect>
        <FormsyText
					style={styles.ingredient}
          hintText="ingredient"
          name={'name-' + i}
        />

				<IconButton
					iconStyle={styles.deleteIcon}
					iconClassName="material-icons"
					type="button"
					onTouchTap={this.removeIngredient}
				>
					remove_circle_outline
				</IconButton>

      </div>
    )
  }
});







var RecipeFormContainer = React.createClass({

  getInitialState: function(){
    var ingredients = [];
    ingredients.push(<IngredientFormGroup key={1} surname={1}/>);
    ingredients.push(<IngredientFormGroup key={2} surname={2}/>);

    return {
      ingredients: ingredients,
			ingredientCount: 2
    };
  },


	mapInputs: function(inputs){
		console.log('mapinputs',inputs);

		var ingredients = [];
		for(var i=1; i<=this.state.ingredientCount; i++){
			ingredients.push({
				qty:	parseInt(inputs['qty-'+i]),
				um:	 	inputs['um-'+i],
				name:	inputs['name-'+i]
			});
		}

		return {
			name: inputs.title,
			yieldNumber: parseInt(inputs.yieldNumber),
			yieldName: inputs.yieldName,
			ingredients: ingredients
		}
	},

  submitForm: function(data){
    console.log(data);
		var recipe = new Recipe(data);
		var userPointer = {
			'__type':'Pointer',
			'className': '_User',
			'objectId': localStorage.getItem('userId')
		}
		recipe.set('user', userPointer)
		recipe.save();
		Backbone.history.navigate('list', {trigger: true});
  },

	removeIngredient: function(pos){
		console.log('removeIngredient()',pos)
		var fields = this.state.ingredients;
		this.setState({ ingredients: fields.slice(0, pos).concat(fields.slice(pos+1)) })
	},

  addIngredient: function(){
		var key = this.state.ingredientCount + 1;


    this.setState({
      ingredients: this.state.ingredients.concat({key: key}),
			ingredientCount: key
    })
  },



	handleBack: function(){
		Backbone.history.navigate('recipes', {trigger: true});
	},

  render: function(){
		var self = this;
    return (
			<App handleBack={this.handleBack}>
		    <div style={styles.app}>
					<Paper style={styles.paper}>
		      <Formsy.Form
						style={styles.form}
		        onValidSubmit={this.submitForm}
						mapping={this.mapInputs}
		      >
		        <div 	style={styles.formRow}>
		          <FormsyText  name="title"
		            hintText="Recipe Name"
								style={styles.nameInput}
		            required
								autoFocus
		          />
		        </div>

		        <div 	style={styles.formRow}>
		          <span style={styles.makes}>
								will make
							</span>

		          <FormsyText  name="yieldNumber"
								style={styles.yieldNumber}
		            hintText="amount"
			          type="number"
		            required
		          />

		          <FormsyText  name="yieldName"
								style={styles.yieldName}
		            hintText="cookies, loaves, etc"
		          />
		        </div>

						<div style={styles.addHeader}>
							<span  style={styles.name}>
								ingredients
							</span>
							<IconButton style={styles.add}
								iconStyle={styles.addIcon}
								onTouchTap={this.addIngredient}
								iconClassName="material-icons"
							>
								add_circle
							</IconButton>
						</div>

						{this.state.ingredients.map(function(ingredient, i){
							return 	<IngredientFormGroup
												key={ingredient.key}
												surname={ingredient.key}
												pos={i}
												removeIngredient={self.removeIngredient}/>;
						})
						}

		        <RaisedButton
							style={styles.submit}
		          type="submit"
		          label="Save"
		          secondary={true}
		        />
		      </Formsy.Form>
				</Paper>
				</div>
			</App>
    )
  }
});



export default RecipeFormContainer;
