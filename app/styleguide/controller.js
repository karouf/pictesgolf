import Ember from 'ember';

export default Ember.Controller.extend({
  tee: function() {
    return this.store.find('tee', 1);
  }.property()
});
