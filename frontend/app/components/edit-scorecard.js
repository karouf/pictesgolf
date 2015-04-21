import Ember from 'ember';

export default Ember.Component.extend({
  holesSortedByNumber: function() {
    return this.get('scorecard.round.course.holes').sortBy('number');
  }.property('scorecard.round.course.holes.@each.number'),
});
