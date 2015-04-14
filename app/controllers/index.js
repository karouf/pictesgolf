import Ember from 'ember';

export default Ember.Controller.extend({
  sorting: ['date:desc'],
  roundsByDate: Ember.computed.sort('content', 'sorting')
});
