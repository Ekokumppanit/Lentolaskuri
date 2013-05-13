'use strict';

define([
  'backbone',
  'views/leg',
  'jquery-ui-sortable'
], function (Backbone, LegView) {

  var RouteView = Backbone.View.extend({
    el: '.route',
    events: {
      'sortstart': 'sortStart',
      'sortstop': 'sortStop'
    },
    initialize: function () {
      this.collection.bind('add', this.add, this);
      this.collection.bind('sort', this.render, this);

      this.$el.sortable({
        handle: 'div > div',
        scroll: false,
      });
    },
    sortStart: function () {
      // fadeOut results
    },
    sortStop: function (event, ui) {
      this.updateSort();
      // fadeIn results
    },
    updateSort: function () {
      // jQuery UI already updates DOM order,
      // so we only have to update Backbone collection to match that
      var self = this;
      this.$el.find('.leg').each(function (index) {
        // Get id of model from element
        var id = $(this).data('id');
        self.collection.get(id).set('order', index);
      });
      this.collection.sort();
    },
    add: function (model, collection, options) {
      var item = new LegView({model: model});
      this.$el.append(item.render().el);
    }
  });

  return RouteView;
});
