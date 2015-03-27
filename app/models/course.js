import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  rounds: DS.hasMany('round', {async: true}),
  holes: DS.hasMany('hole', {async: true})
});
