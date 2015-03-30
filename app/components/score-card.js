import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  strokes: function() {
    var sum = function(sum, score) {
      if(score) {
        return sum + score.get('strokes');
      } else {
        return sum;
      }
    };

    return this.get('scores').reduce(sum, 0);
  }.property('scores.@each.stroke'),
  scores: function() {
    var scores = this.get('scorecard.scores');
    var i;
    var orderedScores = [];

    var hasHoleNumber = function(score) {
      return score.get('hole.number') === this;
    };

    for(i = 0; i < 18; i++) {
      var score = scores.find(hasHoleNumber, i+1);

      if(score) {
        orderedScores[i] = score;
      } else {
        orderedScores[i] = null;
      }
    }

    return orderedScores;
  }.property('scorecard.scores.@each.hole.number'),
  grossScore: function() {
    var scoring = this.get('scorecard.round.scoring');
    var scoringRule = 'gross' + scoring.charAt(0).toUpperCase() + scoring.slice(1);
    return this.get(scoringRule);
  }.property('scorecard.round.scoring', 'scores'),
  netScore: function() {
    var scoring = this.get('scorecard.round.scoring');
    var scoringRule = 'net' + scoring.charAt(0).toUpperCase() + scoring.slice(1);
    return this.get(scoringRule);
  }.property('scorecard.round.scoring', 'scores'),
  par: function() {
    var sum = function(sum, score) {
      if(score) {
        return sum + score.get('hole.par');
      } else {
        return sum;
      }
    };

    return this.get('scores').reduce(sum, 0);
  }.property('scores.@each.hole.par'),
  virtualIndex: function() {
    return this.get('scorecard.player.index') + this.get('indexDiff');
  }.property('scorecard.player.index', 'indexDiff'),
  indexDiff: function() {
    return this.get('indexEvolutionMatrix')[this.get('indexCategory')][this.get('indexEvolution')];
  }.property('indexEvolutionMatrix', 'indexCategory', 'indexEvolution'),
  indexCategory: function() {
    var index = this.get('scorecard.player.index');

    if(index <= 4.4) {
      return 1;
    } else if(index <= 11.4) {
      return 2;
    } else if(index <= 18.4) {
      return 3;
    } else if(index <= 26.4) {
      return 4;
    } else if(index <= 36) {
      return 5;
    } else {
      return 6;
    }
  }.property('scorecard.player.index'),
  indexEvolution: function() {
    var netStableford = this.get('netStableford');
    var minBuffer = this.get('bufferMatrix')[this.get('indexCategory').toString()][this.get('scorecard.round.holesPlayed').toString()]['min'];
    var maxBuffer = this.get('bufferMatrix')[this.get('indexCategory').toString()][this.get('scorecard.round.holesPlayed').toString()]['max'];

    if(netStableford < minBuffer) {
      return 'up';
    } else if(netStableford >= minBuffer && netStableford <= maxBuffer) {
      return 'noop';
    } else {
      return 'down';
    }
  }.property('netStableford', 'bufferMatrix', 'indexCategory', 'scorecard.round.holesPlayed'),
  indexEvolutionMatrix: function() {
    return {
      1: {
           up: 0.1,
           noop: 0,
           down: -0.1
         },
      2: {
           up: 0.1,
           noop: 0,
           down: -0.2
         },
      3: {
           up: 0.1,
           noop: 0,
           down: -0.3
         },
      4: {
           up: 0.1,
           noop: 0,
           down: -0.4
         },
      5: {
           up: 0.2,
           noop: 0,
           down: -0.5
         },
      6: {
           up: 0,
           noop: 0,
           down: -1
         },
    };
  }.property(),
  bufferMatrix: function() {
    return {
      1: {
            18: {
                  min: 35,
                  max: 36
                },
            9: {
                  min: null,
                  max: null
               }
         },
      2: {
            18: {
                  min: 34,
                  max: 36
                },
            9: {
                  min: null,
                  max: null
               }
         },
      3: {
            18: {
                  min: 33,
                  max: 36
                },
            9: {
                  min: 35,
                  max: 36
               }
         },
      4: {
            18: {
                  min: 32,
                  max: 36
                },
            9: {
                  min: 34,
                  max: 36
               }
         },
      5: {
            18: {
                  min: 31,
                  max: 36
                },
            9: {
                  min: 33,
                  max: 36
               }
         },
      6: {
            18: {
                  min: 0,
                  max: 36
                },
            9: {
                  min: 0,
                  max: 36
               }
         }
    };
  }.property(),
  netStableford: function() {
    var sum = function(sum, score) {
      if(score) {
        return sum + score.get('netStableford');
      } else {
        return sum;
      }
    };

    var total = this.get('scores').reduce(sum, 0);

    if(this.get('scorecard.round.holesPlayed') === 9) {
      total += 18;
    }

    return total;
  }.property('scores.@each.netStableford'),
  grossStableford: function() {
    var sum = function(sum, score) {
      if(score) {
        return sum + score.get('grossStableford');
      } else {
        return sum;
      }
    };

    return this.get('scores').reduce(sum, 0);
  }.property('scores.@each.grossStableford'),
  netStrokeplay: function() {
    return this.get('strokes') - this.get('par') - this.get('scorecard.playingIndex');
  }.property('strokes', 'par', 'scorecard.playingIndex'),
  grossStrokeplay: function() {
    return this.get('strokes') - this.get('par');
  }.property('strokes', 'par')
});
