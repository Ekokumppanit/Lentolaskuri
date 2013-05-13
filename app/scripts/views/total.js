'use strict';

define([
  'backbone',
  'Template'
], function (Backbone, Template) {
  var TotalView = Backbone.View.extend({
    el: '.totalWidget',
    initialize: function () {
      this.render.apply(this);
      this.model.bind('change', this.render, this);
    },
    render: function () {
      this.$el.html(Template.total(this.model.toJSON()));
    }
  });

  return TotalView;
});
