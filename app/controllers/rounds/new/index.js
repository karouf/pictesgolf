import Ember from 'ember';

export default Ember.ObjectController.extend({
  date: moment(new Date()).format('YYYY-MM-DD'),
  selectedPlayers: Ember.A(),
  initPlayers: function() {
    if(this.get('courseChosen')) {
      this.addBlankPlayer();
    } else {
      this.set('selectedPlayers', Ember.A());
    }
  }.observes('courseChosen'),
  addBlankPlayer: function() {
    this.get('selectedPlayers').pushObject(Ember.Object.create({player: null, tee: null}));
  },
  setCourse: function() {
    var round = this.get('round');
    round.set('course', this.get('course'));
  }.observes('course'),
  courseChosen: function() {
    return !!this.get('course');
  }.property('course'),
  tees: function() {
    return this.get('course.tees');
  }.property('course.tees'),
  hasPlayer1: function() {
    return this.get('selectedPlayers').length > 0;
  }.property('selectedPlayers.@each'),
  hasPlayer2: function() {
    return this.get('selectedPlayers').length > 1;
  }.property('selectedPlayers.@each'),
  hasPlayer3: function() {
    return this.get('selectedPlayers').length > 2;
  }.property('selectedPlayers.@each'),
  hasPlayer4: function() {
    return this.get('selectedPlayers').length > 3;
  }.property('selectedPlayers.@each'),
  setSelection: function(type, number) {
    var index = number - 1;
    var players = this.get('selectedPlayers');

    if(players.length >= number) {
      var player = players[index];
      var item = this.get(type + number);

      player.set(type, item);
    }
  },
  setPlayer1: function() {
    this.setSelection('player', 1);
  }.observes('player1'),
  setPlayer2: function() {
    this.setSelection('player', 2);
  }.observes('player2'),
  setPlayer3: function() {
    this.setSelection('player', 3);
  }.observes('player3'),
  setPlayer4: function() {
    this.setSelection('player', 4);
  }.observes('player4'),
  setTee1: function() {
    this.setSelection('tee', 1);
  }.observes('tee1'),
  setTee2: function() {
    this.setSelection('tee', 2);
  }.observes('tee2'),
  setTee3: function() {
    this.setSelection('tee', 3);
  }.observes('tee3'),
  setTee4: function() {
    this.setSelection('tee', 4);
  }.observes('tee4'),
  canAddPlayer: function() {
    return this.get('selectedPlayers').length < 4;
  }.property('selectedPlayers.@each'),
  playersAndTeesChosen: function() {
    return this.get('playersChosen') && this.get('teesChosen');
  }.property('playersChosen', 'teesChosen'),
  playersChosen: function() {
    return this.get('selectedPlayers').filterBy('player', null).length === 0;
  }.property('selectedPlayers.@each.player'),
  teesChosen: function() {
    return this.get('selectedPlayers').filterBy('tee', null).length === 0;
  }.property('selectedPlayers.@each.tee'),
  removePlayer: function(number) {
    var index = number - 1;
    var players = this.get('selectedPlayers');
    var nb;

    for(nb = number; nb <= players.length; nb++) {
      var newNb = nb + 1;
      var player = this.get('player' + newNb);
      var tee = this.get('tee' + newNb);

      this.set('player' + nb, player);
      this.set('tee' + nb, tee);
    }

    this.get('selectedPlayers').removeAt(index);
  },
  createScorecards: function() {
    var players = this.get('selectedPlayers');
    var round = this.get('round');
    var self = this;

    round.set('scoring', 'stableford');
    round.set('holesPlayed', 9);
    round.set('type', 'amical');

    players.forEach(function(player) {
      var scorecard = self.store.createRecord('scorecard');
      scorecard.set('round', round);
      scorecard.set('player', player.get('player'));
      scorecard.set('tee', player.get('tee'));

      var scores = scorecard.get('scores');
      var holes = round.get('course.holes');
      holes.forEach(function(hole) {
        scores.pushObject(self.store.createRecord('score', { hole: hole }));
      });
    });
  },
  actions: {
    addPlayer: function() {
      this.addBlankPlayer();
    },
    removePlayer2: function() {
      this.removePlayer(2);
    },
    removePlayer3: function() {
      this.removePlayer(3);
    },
    removePlayer4: function() {
      this.removePlayer(4);
    },
    enterScores: function() {
      this.createScorecards();
      this.transitionToRoute('rounds.new.scores');
    }
  }
});
