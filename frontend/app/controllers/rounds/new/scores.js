import Ember from 'ember';

export default Ember.Controller.extend({
  cleanUpScores: function() {
    this.get('content.round.scorecards').forEach(function(scorecard) {
      var scores = scorecard.get('scores');
      var scoresToRemove = Ember.A();

      scores.forEach(function(score) {
        if(!!score && !score.get('strokes')) {
          scoresToRemove.pushObject(score);
        }
      });
      scores.removeObjects(scoresToRemove);
    });
  },
  actions: {
    reviewScores: function() {
      this.cleanUpScores();
      this.transitionToRoute('rounds.new.review');
    }
  }
});
