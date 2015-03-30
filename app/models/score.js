import DS from 'ember-data';

export default DS.Model.extend({
  strokes: DS.attr('number'),
  receivedStrokes: DS.attr('number'),
  scorecard: DS.belongsTo('scorecard', {async: true}), 
  hole: DS.belongsTo('hole', {async: true}), 
  netStableford: function() {
    var par = this.get('hole.par');
    var receivedStrokes = this.get('scorecard.receivedStrokes')[this.get('hole.number') - 1];
    var strokes = this.get('strokes');

    var net = (par + receivedStrokes) + 2 - strokes;

    if(net < 0) {
      return 0;
    } else {
      return net;
    }
  }.property('hole.par', 'scorecard.receivedStrokes', 'hole.number', 'strokes')
});
