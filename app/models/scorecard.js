import DS from 'ember-data';

export default DS.Model.extend({
  playingIndex: DS.attr('number'),
  round: DS.belongsTo('round', {async: true}),
  player: DS.belongsTo('player', {async: true}),
  scores: DS.hasMany('score', {async: true})
});
