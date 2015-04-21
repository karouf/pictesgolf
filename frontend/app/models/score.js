import DS from 'ember-data';

export default DS.Model.extend({
  strokes: DS.attr('number'),
  receivedStrokes: DS.attr('number'),
  scorecard: DS.belongsTo('scorecard', {async: true}), 
  hole: DS.belongsTo('hole', {async: true}), 
  netStableford: function() {
    var par = this.get('hole.par');
    var receivedStrokes = this.get('receivedStrokes');
    var strokes = this.get('strokes');

    var net = par + receivedStrokes + 2 - strokes;

    if(net < 0) {
      net = 0;
    }

    return net;
  }.property('hole.par', 'receivedStrokes', 'strokes'),
  grossStableford: function() {
    var par = this.get('hole.par');
    var strokes = this.get('strokes');

    var net = par + 2 - strokes;

    if(net < 0) {
      net = 0;
    }

    return net;
  }.property('hole.par', 'strokes')
});
