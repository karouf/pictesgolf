import Ember from 'ember';

export default Ember.Component.extend({
  html: '',
updateHtml: function() {
  this.set('html', this.$().children()[2].innerHTML);
  this.$().children()[2].hidden = true;
},
didInsertElement: function() {
  Ember.run.scheduleOnce('afterRender', this, this.updateHtml);
}
});
