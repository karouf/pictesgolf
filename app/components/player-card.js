import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',
  picture: function() {
    return '/assets/images/default-user-pic.png';
  }.property()
});
