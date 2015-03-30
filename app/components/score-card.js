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
  }.property('scorecard.scores.@each.hole.number'),
  grossScore: function() {
    return this.get('strokes') - this.get('par');
  }.property('strokes', 'par'),
  netScore: function() {
    return this.get('grossScore') - this.get('scorecard.playingIndex');
  }.property('grossScore', 'scorecard.playingIndex'),
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
    var minBuffer = this.get('bufferMatrix')[this.get('indexCategory')][this.get('scorecard.round.holesPlayed')][0];
    var maxBuffer = this.get('bufferMatrix')[this.get('indexCategory')][this.get('scorecard.round.holesPlayed')]     [1];

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
    }
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
    }
  }.property(),
  netStableford: function() {
    var sum = function(sum, score) {
      if(score) {
        return sum + score.get('netStableford');
      } else {
        return sum;
      }
    }

    return this.get('scores').reduce(sum, 0);
  }.property('scores.@each.netStableford')
});
