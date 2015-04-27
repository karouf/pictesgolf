import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  holesPlayed: DS.attr('number'),
  scoring: DS.attr('string'),
  competition: DS.attr('boolean'),
  course: DS.belongsTo('course', {async: true}),
  scorecards: DS.hasMany('scorecard', {async: true})
});
