import Ember from 'ember';

export default Ember.Component.extend({
  picture: function() {
    return '/assets/images/default-user-pic.png';
  }.property()
});
