import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  par: function() {
    var sum = function(sum, hole) {
      if(hole) {
        return sum + hole.get('par');
      } else {
        return sum;
      }
    };

    return this.get('holes').reduce(sum, 0);
  }.property('holes.@each.par'),
  rounds: DS.hasMany('round', {async: true}),
  holes: DS.hasMany('hole', {async: true}),
  tees: DS.hasMany('tee', {async: true})
});
