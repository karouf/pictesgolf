import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveRound: function() {
      var round = this.get('content.round');

      round.save().then(function() {
        round.get('scorecards').then(function(scorecards) {
          scorecards.forEach(function(scorecard) {
            scorecard.set('round', round);
            scorecard.save().then(function() {
              scorecard.get('scores').then(function(scores) {
                scores.forEach(function(score) {
                  score.set('scorecard', scorecard);
                  score.save();
                });
              });
            });
          });
        });
      });

      this.transitionToRoute('index');
    }
  }
});
