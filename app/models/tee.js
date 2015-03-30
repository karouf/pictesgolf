import DS from 'ember-data';

export default DS.Model.extend({
  color: DS.attr('string'),
  sss: DS.attr('number'),
  slope: DS.attr('number')
});
