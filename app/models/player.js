import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  index: DS.attr('number'),
  scorecards: DS.hasMany('scorecard', {async: true})
});
