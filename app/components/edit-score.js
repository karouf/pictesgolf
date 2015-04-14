import Ember from 'ember';

export default Ember.Component.extend({
  updateScoreStrokes: function() {
    var value = Number(this.get('strokes'));
    this.set('score.strokes', value);
  }.observes('strokes'),
  updateStrokes: function() {
    var value = Number(this.get('score.strokes'));
    this.set('strokes', Number.isNaN(value) ? null : value);
  }.observes('score.strokes'),
});
