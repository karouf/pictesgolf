import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('styleguide');
  this.resource('rounds', function() {
    this.route('new', function() {
      this.route('scores');
      this.route('review');
    });
  });
});

export default Router;
