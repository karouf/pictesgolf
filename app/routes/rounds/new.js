import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Em.RSVP.hash({
      content: this.store.createRecord('round'),
      courses: this.store.find('course'),
      players: this.store.find('player')
    });
  },
  setupController: function(controller, model) {
    controller.setProperties(model);
  }
});
