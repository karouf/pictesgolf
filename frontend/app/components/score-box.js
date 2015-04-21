import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',
  classNames: ['score-card__score'],
  classNameBindings: ['toPar'],
  toPar: function() {
    var par = this.get('score.hole.par');
    var strokes = this.get('score.strokes');

    if(!par) { return null; }

    var prefix = 'score-card__score--';
    var perf = '';
    var toPar =  strokes - par;
    if(toPar > 3) { toPar = 3; }

    switch(toPar) {
      case -4:
        perf = 'condor';
        break;
      case -3:
        perf = 'albatross';
        break;
      case -2:
        perf = 'eagle';
        break;
      case -1:
        perf = 'birdie';
        break;
      case 0:
        perf = 'par';
        break;
      case 1:
        perf = 'bogey';
        break;
      case 2:
        perf = 'double-bogey';
        break;
      case 3:
        perf = 'triple-bogey';
        break;
      default:
        perf = 'triple-bogey';
    }

    return prefix + perf;
  }.property('score.strokes', 'score.hole.par')
});
