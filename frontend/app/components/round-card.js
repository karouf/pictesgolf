import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
  holes: function() {
    var round = this.get('round');
    var promise;

    if(round.isFulfilled === undefined || round.isFulfilled === true) {
      promise = round.get('course').then(function(course) {
        return course.get('holes').then(function(holes) {
          return holes.sortBy('number');
        });
      });
    } else {
      promise = this.get('round').then(function(round) {
        return round.get('course').then(function(course) {
          return course.get('holes').then(function(holes) {
            return holes.sortBy('number');
          });
        });
      });
    }

    return DS.PromiseArray.create({
      promise: promise
    });
  }.property('round.course.holes.@each.number'),
  roundType: function() {
    var competition = this.get('round.competition');

    if(competition) {
      return 'competition';
    } else {
      return 'amical';
    }
  }.property('round.competition')
});
