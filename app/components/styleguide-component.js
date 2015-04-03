import Ember from 'ember';

export default Ember.Component.extend({
  html: '',
  init: function() {
    this._super();
    this.storePassedProperties();
    this.createOutputView();
    this.createHtmlView();
  },
  storePassedProperties: function() {
    var passedProperties = [];

    var existingProperties = ['helperName', 'container', 'elementId', 'currentState', 'classNames', 'component'];
    for(var propName in this) {
      if(this.hasOwnProperty(propName)) {
        if(propName[0] != '_') {
          if(existingProperties.indexOf(propName) < 0) {
            if(propName.indexOf('Binding') < 0) {
              passedProperties.push(propName);
            }
          }
        }
      }
    }

    this.set('passedProperties', passedProperties);
  },
  createOutputView: function() {
    var componentLookup = this.container.lookup('component-lookup:main');
    var viewClass = componentLookup.lookupFactory(this.get('component'));
    var passedProperties = this.get('passedProperties')
    var props = {classNames: ['styleguide-output']};

    var i;
    for(i = 0; i < passedProperties.length; i++) {
      props[passedProperties[i]] = this.get(passedProperties[i]);
    }

    if( viewClass )
    {
      var view = viewClass.create(props);
      this.set('outputView', view);
    }
  },
  createHtmlView: function() {
    var viewObject = Ember.View.extend({
      template: Ember.HTMLBars.compile('{{html}}'),
    });
    var view = viewObject.create({
      controller: this
    });
    this.set('htmlView', view);
  },
  render: function(buffer) {
    this.renderTitle(buffer);
    this.renderOutput();
    this.renderEmberMarkup(buffer);
    this.renderHTML(buffer);
  },
  renderTitle: function(buffer) {
    var title = this.get('title') || this.get('component').capitalize();
    buffer.push('<h3>' + title + '</h3>');
  },
  renderOutput: function() {
    var outputView = this.get('outputView');

    if(outputView) {
      this.appendChild(outputView);
    }
  },
  renderEmberMarkup: function(buffer) {
    var passedProperties = this.get('passedProperties');
    var i;

    buffer.push('<div class="styleguide__ember valign-wrapper">');
    buffer.push('<pre class="valign">');
    buffer.push('{{' + this.get('component'));

    for(i = 0; i < passedProperties.length; i++) {
      var prop = passedProperties[i];
      var type = typeof this.get(prop);
      buffer.push(' ' + prop + '=' + type);
    }
    buffer.push('}}');

    buffer.push('</pre>');
    buffer.push('</div>');
  },
  renderHTML: function(buffer) {
    var view = this.get('htmlView');

    buffer.push('<div class="styleguide__html valign-wrapper">');
    buffer.push('<pre class="valign">');

    if(view) {
      this.appendChild(view);
    }

    buffer.push('</pre>');
    buffer.push('</div>');

    Ember.run.scheduleOnce('afterRender', this, this.updateHtml);
  },
  updateHtml: function() {
    var output = this.$().find('.styleguide-output');

    if(output.length > 0) {
      this.set('html', output[0].innerHTML);
    }
  }
});
