import DS from 'ember-data';

export default DS.Model.extend({
scorecards: DS.hasMany('scorecard', {async: true}),
  color: DS.attr('string'),
  sss: DS.attr('number'),
  slope: DS.attr('number')
});
