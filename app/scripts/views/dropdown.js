define([
  'backbone',
  'select2'
], function (Backbone) {
  var Dropdown = Backbone.View.extend({
    events: {
      'change': 'change'
    },
    initialize: function (opts) {
      this.$el.select2(opts.select2);
    },
    open: function () {
      this.$el.select2('open');
    },
    change: function () {
      this.trigger('new-leg', this.$el.select2('data'));
      this.$el.select2('data', {});
    }
  });

  return Dropdown;
});
