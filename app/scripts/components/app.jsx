import $ from 'jquery';
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, Paper, RaisedButton} from 'material-ui';


const styles = {
  appBar: {
    marginBottom: '8px'
  },
  button: {
    marginRight: '8px'
  }
};

var Main = React.createClass({
  handleTitle: function(){
    this.props.router.navigate('', {trigger: true});
  },

  render: function() {

    return (	<MuiThemeProvider>
								<div>
									<AppBar
									title="Batch Maker"
									showMenuIconButton={false}
									onTitleTouchTap={this.handleTitle}
									style={styles.appBar}
									/>
								</div>
							</MuiThemeProvider>
		);
  }
});

export default Main;
