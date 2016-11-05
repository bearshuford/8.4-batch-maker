import $ from 'jquery';
import Backbone from 'backbone';
import './router.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

$(function(){
  Backbone.history.start();
});
