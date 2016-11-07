import $ from 'jquery';
import React from 'react';

import {AppBar, FlatButton, IconButton, IconMenu, MenuItem, Divider} from 'material-ui';

import Theme from './theme.jsx'
import User from './../models/User'


const styles = {
  appBar: {
  	marginBottom: '8px'
	},
	title: {

	},
  username: {
    fontFamily: '"Lobster", cursive',
    fontSize: 22,
    hoverColor: 'blue',
    cursor: 'default'
  },
  nameItem: {
    hoverColor: 'none'
  }
};


var UserMenu = React.createClass({


  render: function(){




    return (
      <IconMenu desktop={true}
        iconButtonElement={<IconButton iconClassName="material-icons">account_circle</IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          style={styles.nameItem}
          primaryText={this.props.label}
          innerDivStyle={styles.username}
          />
        <Divider />
        <MenuItem
          primaryText="Settings"
          disabled={true}
          leftIcon={<i className="material-icons">settings</i>}/>
        <MenuItem
          primaryText="Help"
          disabled={true}
          leftIcon={<i className="material-icons">help</i>}/>
        <MenuItem
          primaryText="Sign out"
          onTouchTap={this.props.handleLogout}
          leftIcon={<i className="material-icons">power_settings_new</i>}/>
      </IconMenu>
    )
  }
})

var App = React.createClass({
  handleTitle: function(){
    /* this.props.router.navigate('', {trigger: true}); */
  },

  handleLogout: function(){
    var user = new User();
    user.logout();
    console.log('handleLogout');
    this.props.router.navigate('login', {trigger:true})
  },

  render: function() {
    var hasUser = (localStorage.getItem('sessionToken') !== null);
    var username = localStorage.getItem('username');
    return (
      <Theme>
  			<AppBar
    			title={<span style={styles.title}>Batch Maker</span>}
    			showMenuIconButton={false}
    			onTitleTouchTap={this.handleTitle}
    			style={styles.appBar}
          iconElementRight={!hasUser ? null :
            <UserMenu
              label={username}
              handleLogout={this.handleLogout}/>
          }
  			/>
        {this.props.children}
    	</Theme>
		);
  }
});


export default App;
