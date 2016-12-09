import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import React from 'react';

import {Paper, FloatingActionButton, RaisedButton,
  Divider, MenuItem, IconButton, FlatButton} from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import Save from 'material-ui/svg-icons/content/save';
import Close from 'material-ui/svg-icons/navigation/close';

import {blue500, red500, greenA200} from 'material-ui/styles/colors';

import Formsy from 'formsy-react';
import {FormsyText, FormsySelect} from 'formsy-material-ui/lib';


import Recipe from './../models/recipe.js'
import App from './app.jsx'


const styles = {
  app: {
    width: 		480,
    maxWidth: "90%",
    margin: 	'12px auto'
  },
  paper: {
	  padding:   '10px 20px',
		marginTop: -70,
		zIndex: 	 2000,
		position:  'relative'
  },
  form: {
		display: 			'flex',
    flexFlow: 		'column nowrap',
    marginBottom: 8
  },
  formRow: {
    display:	  'flex',
    flexFlow: 	'row nowrap',
		alignItems: 'center'
  },
	name: {
     fontSize:   22,
     fontWeight: 'normal',
     fontFamily: '"Roboto", sans-serif',
     marginLeft: 4,
     marginTop: 18
  },
  nameInput: {
	  fontSize: 	  30,
		marginBottom: 4,
		maxWidth: 	  '80%'
  },
	makes: {
		fontSize:   22,
		fontFamily: '"Lobster", sans-serif',
	},
  none: {
    marginTop: 0
  },
	yieldNumber: {
		marginLeft: 18,
		width: 			60
	},
	yieldName: {
		marginLeft: 18,
		width: 		  180
	},
	qty: {
		width: 			 60,
		marginRight: 16,
		marginLeft:  6
	},
	um: {
		width: 			 100,
		marginRight: 16
	},
	submitAction: {
    top: 			26,
    right: 		-26,
    margin: 	0,
    position: 'absolute',
    zIndex: 	3000
	},
	removeIngredient: {
		// paddingRight: 0,
		// paddingLeft:  0,
		// width: 				36
		marginRight: -22,
		marginLeft: -8
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
          hintText="#"
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
          hintText="ingredient"
          name={'name-' + i}
        />

				<IconButton
					type="button"
					onTouchTap={this.removeIngredient}
					style={styles.removeIngredient}
				>	<Close hoverColor={red500}/>
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
      ingredients: 		 ingredients,
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
			yieldNumber: parseInt(inputs.yieldNumber),
			yieldName: 	 inputs.yieldName,
			name: 			 inputs.title,
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

			          <span  style={styles.makes}> makes </span>

			          <FormsyText  name="yieldNumber"
									style={styles.yieldNumber}
			            hintText="#"
				          type="number"
			            required
			          />

			          <FormsyText  name="yieldName"
									style={styles.yieldName}
			            hintText="servings"
			          />

			        </div>

							<span  style={styles.name}> ingredients </span>

							{this.state.ingredients.map(function(ingredient, i){
								return 	<IngredientFormGroup
													key={ingredient.key}
													surname={ingredient.key}
													pos={i}
													removeIngredient={self.removeIngredient}/>;
							})}

							<FlatButton
								icon={<Add/>}
								onTouchTap={this.addIngredient}
							/>

							<FloatingActionButton
								style={styles.submitAction}
								type="submit"
								children={<Save/>}
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
