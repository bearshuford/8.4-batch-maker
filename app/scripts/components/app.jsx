import $ from 'jquery';
import React from 'react';

import {AppBar} from 'material-ui';

import Theme from './theme.jsx'


const styles = {
  appBar: {
  	marginBottom: '8px'
	}
};



var App = React.createClass({
  handleTitle: function(){
    this.props.router.navigate('', {trigger: true});
  },

  render: function() {

    return (
      <Theme>
  			<AppBar
    			title="Batch Maker"
    			showMenuIconButton={false}
    			onTitleTouchTap={this.handleTitle}
    			style={styles.appBar}
  			/>
        {this.props.children}
    	</Theme>
		);
  }
});


export default App;
