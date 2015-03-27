import Ember from 'ember';

export default Ember.Component.extend({
  holes: function() {
    return this.get('round.course.holes').sortBy('number');
  }.property('round.course.holes.@each.number')
});
