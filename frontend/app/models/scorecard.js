import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  playingIndex: function() {
    var index = this.get('player.index');
    var slope = this.get('tee.slope');
    var sss = this.get('tee.sss');
    var par = this.get('round.course.par');

    return Math.round((index * slope) / 113 + (sss - par));
  }.property('player.index', 'tee.slope', 'tee.sss', 'round.course.par'),
  round: DS.belongsTo('round', {async: true}),
  player: DS.belongsTo('player', {async: true}),
  tee: DS.belongsTo('tee', {async: true}),
  scores: DS.hasMany('score', {async: true}),
  receivedStrokes: function() {
    var strokes = this.get('playingIndex');
    var scores = this.get('scoresByHoleIndex');

    var addReceivedstrokes = function(score) {
      if(strokes === 0) {
        return;
      }
      score.receivedStrokes += 1;
      strokes -= 1;
    };

    while(strokes > 0) {
      scores.forEach(addReceivedstrokes);
    }
  }.property('playingIndex', 'scoresByHoleIndex'),
  scoresByHoleIndex: function() {
    var holesPlayed = this.get('round.holesPlayed');
    var scores;
    if(holesPlayed === 9) {
      scores = this.get('scores').slice(0, 9);
    } else {
      scores = this.get('scores');
    }

    return scores.sortBy('hole.strokeIndex');
  }.property('scores.@each.hole.strokeIndex'),
  scoresByHoleNumberSorting: ['hole.number'],
  scoresByHoleNumber: Ember.computed.sort('scores', 'scoresByHoleNumberSorting')
});
