import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  playingIndex: function() {
    return 4;
  }.property(),
  strokes: function() {
    var sum = function(sum, score) {
      if(score) {
        return sum + score.get('strokes');
      } else {
        return sum;
      }
    }

    return this.get('scores').reduce(sum, 0);
  }.property('scores.@each.stroke'),
  scores: function() {
    var scores = this.get('scorecard.scores');
    var i;
    var orderedScores = [];

    for(i = 0; i < 18; i++) {
      var score = scores.find(function(score) {
        return score.get('hole.number') == i+1;
      });

      if(score) {
        orderedScores[i] = score;
      } else {
        orderedScores[i] = null;
      }
    }

    return orderedScores;
  }.property('scorecard.scores.@each.hole.number')
});
