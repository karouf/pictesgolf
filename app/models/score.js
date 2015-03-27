import DS from 'ember-data';

export default DS.Model.extend({
  strokes: DS.attr('number'),
  scorecard: DS.belongsTo('scorecard', {async: true}), 
  hole: DS.belongsTo('hole', {async: true}) 
});
