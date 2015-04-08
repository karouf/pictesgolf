import Ember from 'ember';

export default Ember.Controller.extend({
  tee: function() {
    return this.store.find('tee', 1);
  }.property(),
  player: function() {
    return this.store.find('player', 1);
  }.property(),
  date: function() {
    return new Date();
  }.property(),
  round: function() {
    return this.store.find('round', 1);
  }.property(),
});
