import Ember from 'ember';

export default Ember.Component.extend({
  color: function() {
    return 'tee__color--' + this.get('tee.color');
  }.property('tee.color'),
});
