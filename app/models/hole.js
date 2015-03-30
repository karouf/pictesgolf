import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr('number'),
  par: DS.attr('number'),
  strokeIndex: DS.attr('number'),
  course: DS.belongsTo('course', {async: true}),
  scores: DS.hasMany('score', {async: true})
});
