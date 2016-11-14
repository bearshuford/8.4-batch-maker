import React from 'react';
import Backbone from 'backbone';

import {List, ListItem, Paper, FloatingActionButton, Divider} from 'material-ui';

import Formsy from 'formsy-react';

import Recipe from './../models/Recipe';
import RecipeCollection from './../models/RecipeCollection';

import App from './app.jsx';




const styles = {
  app: {
		marginTop: -78,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  },
  paper: {
		position: 'relative',
		marginTop: 16,
		padding: 0,
		minWidth: 300,
		zIndex: 3000
  },
  addButton: {
    bottom: -28,
    right: -26,
    margin: 0,
    position: 'absolute',
    zIndex: 3000
  },
	listItem: {
		fontSize: 28,
		marginTop: 5

	},
	title: {
		fontSize: 30,
		fontWeight: 'normal',
		fontFamily: '"Lobster", sans-serif',
		alignSelf: 'flex-start',
		marginTop: 4,
		marginBottom: 4,
		marginLeft: 14,
		padding: 0,

	}



};



var RecipeItem = React.createClass({

  toDetail: function(){
    var id = this.props.recipe.get('objectId');
    Backbone.history.navigate('recipes/'+id, {trigger: true});
	},

  render: function() {
    return (
      <ListItem
        style={styles.listItem}
        primaryText={this.props.recipe.get('name')}
        onTouchTap={this.toDetail}

      />
		);
  }
});


var RecipeList = React.createClass({


  getInitialState: function(){
    return {
      recipes: new RecipeCollection()
    };
  },

  componentWillMount: function(){
    var recipes= this.state.recipes;
    recipes.fetch().then(
      function(){
        this.setState({recipes: recipes});
      }.bind(this)
    );
    return true;
  },

  render: function(){
    var recipes = this.state.recipes.map(
      function(recipe){
        return <RecipeItem key={recipe.cid} recipe={recipe}/>
      }
    );
    return(
      <App>
      <div style={styles.app}>
        <Paper style={styles.paper}>
					<h3 style={styles.title}>recipes</h3>
          <List>
					<Divider/>
            {recipes}
          </List>
          <FloatingActionButton
            style={styles.addButton}
            href="#recipes/new"
            secondary={true}
            zDepth={1}
          >

            <i className='material-icons'>add</i>
          </FloatingActionButton>
        </Paper>
      </div>
    </App>
    );
  }
});

export default RecipeList;
