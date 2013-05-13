'use strict';

define([
  'backbone',
  'Template'
], function (Backbone, Template) {
  var LegView = Backbone.View.extend({
    tagName: 'div',
    className: 'leg',
    events: {
      'click a.delete': 'destroy'
    },
    initialize: function () {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },
    destroy: function () {
      this.model.destroy();
    },
    render: function () {
      this.$el.data('id', this.model.get('id'));
      this.$el.attr('id', 'leg-' + this.model.get('id')); // fuu
      this.$el.html(Template.leg(this.model.toJSON()));
      return this;
    }
  });

  return LegView;
});
