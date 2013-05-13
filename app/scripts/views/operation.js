'use strict';

define([
  'backbone',
  'Template',
  'config',
  'bootstrap'
], function (Backbone, Template, config) {
  var Operation = Backbone.View.extend({
    el: '#operation',
    initialize: function () {
      this.render.apply(this);
    },
    render: function () {
      this.$el.html(Template.operation(config));
      this.$el.find('abbr').tooltip();
      return this;
    }
  });

  return Operation;
});
