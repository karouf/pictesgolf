import DS from 'ember-data';

export default DS.Model.extend({
  playingIndex: DS.attr('number'),
  round: DS.belongsTo('round', {async: true}),
  player: DS.belongsTo('player', {async: true}),
  scores: DS.hasMany('score', {async: true}),
  receivedStrokes: function() {
    var strokes = this.get('playingIndex');
    var holesPlayed = this.get('round.holesPlayed');
    var scores = this.get('scoresByHoleIndex');

    var addReceivedstrokes = function(score) {
      if(strokes === 0) {
        return;
      }
      score.receivedStrokes += 1;
      strokes -= 1;
    };

    while(strokes > 0) {
      scores.forEach(addReceivedstrokes(score));
    }
  }.property('playingIndex', 'round.holesPlayed', 'scoresByHoleIndex'),
  scoresByHoleIndex: function() {
    var holesPlayed = this.get('round.holesPlayed');
    if(holesPlayed == 9) {
      var scores = this.get('scores').slice(0, 9);
    } else {
      var scores = this.get('scores');
    }

    return scores.sortBy('hole.strokeIndex');
  }.property('scores.@each.hole.strokeIndex'),
  scoresByHoleNumber: function() {
    var scores = this.get('scores');
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
  }.property('scores.@each.hole.number'),
});
