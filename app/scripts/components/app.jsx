import $ from 'jquery';
import React from 'react';

import {AppBar, FlatButton, FloatingActionButton, SvgIcon, IconButton, IconMenu, MenuItem, Divider} from 'material-ui';

import Theme from './theme.jsx'
import User from './../models/User'


const styles = {
  appBar: {
  	marginBottom: '8px',
    height: 128
	},
  titleDiv: {
    height: 64,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center'
  },
	icon: {
    fontSize: 26,
    color: 'white',
    padding: 0
	},
  username: {
    fontFamily: '"Lobster", cursive',
    fontSize: 24,
    hoverColor: 'blue',
    cursor: 'default'
  },
  nameItem: {
    hoverColor: 'none'
  },

  fab: {
    position: 'fixed',
    bottom: 29,
    right: 25
  }
};




const BearIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 32 32" >
    <path d="M26.771 2.022c-2.44 0-4.462 1.673-4.95 3.904h-11.782c-0.558-2.231-2.58-3.904-4.95-3.904-2.789 0-5.089 2.301-5.089 5.089 0 1.952 1.115 3.695 2.789 4.532v5.508c0 7.111 6.135 12.828 13.246 12.828s13.246-5.717 13.246-12.828v-5.508c1.603-0.837 2.719-2.58 2.719-4.532-0.070-2.789-2.37-5.089-5.229-5.089zM9.272 12.549c0-0.767 0.627-1.464 1.464-1.464s1.464 0.627 1.464 1.464-0.627 1.464-1.464 1.464-1.464-0.627-1.464-1.464zM15.895 27.468c-2.649 0-4.88-2.858-4.88-6.344s2.161-6.344 4.88-6.344c2.719 0 4.88 2.858 4.88 6.344s-2.161 6.344-4.88 6.344zM21.124 14.013c-0.837 0-1.464-0.627-1.464-1.464 0-0.767 0.627-1.464 1.464-1.464 0.767 0 1.464 0.627 1.464 1.464s-0.627 1.464-1.464 1.464z"></path>
    <path d="M13.386 18.475c-0.418 0-0.837 0.209-0.976 0.558-0.139 0.418-0.070 0.837 0.209 1.115l2.51 2.51c0.418 0.418 1.115 0.418 1.534 0l2.51-2.51c0.279-0.279 0.418-0.697 0.209-1.115-0.139-0.418-0.558-0.558-0.976-0.558h-5.020z"></path>
  </SvgIcon>
);


var UserMenu = React.createClass({

  render: function(){
    return (
      <IconMenu desktop={true}
        style={styles.iconButton}
        iconButtonElement={<IconButton iconStyle={styles.icon} iconClassName="material-icons">account_circle</IconButton>}
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

  handleLogout: function(){
    var user = new User();
    user.logout();
  },

  render: function() {
    var hasUser = (localStorage.getItem('sessionToken') !== null);
    var username = localStorage.getItem('username');

    var back = this.props.handleBack !== undefined;

    return (
      <Theme>
  			<AppBar
    			title={<span> Batch Maker</span>}
    			showMenuIconButton={back}
    			onTitleTouchTap={this.handleTitle}
    			style={styles.appBar}
          titleStyle={styles.titleDiv}
          iconElementRight={!hasUser ? null :
            <UserMenu
              label={username}
              handleLogout={this.handleLogout}/>
          }
          iconElementLeft={ !back ? null :
            <IconButton
              iconStyle={styles.icon}
              iconClassName="material-icons"
              onTouchTap={this.props.handleBack}>
                arrow_back
            </IconButton>}
  			/>
        {this.props.children}

        <FloatingActionButton
          style={styles.fab}
          backgroundColor="black"
          children={<BearIcon color="white"/>}
          href="http://bear.works"
        />
    	</Theme>
		);
  }
});


export default App;
