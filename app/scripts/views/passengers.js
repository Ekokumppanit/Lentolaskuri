define([
  'backbone',
  'backbone-mediator'
], function (Backbone) {
  var PassengersInput = Backbone.View.extend({
    el: '.passengersWidget',
    events: {
      'change input': 'change',
      'keyup input': 'change'
    },
    initialize: function () {
      this.value = 1;
    },
    change: function (event) {
      var val = this.$el.find('input').val();
      if (!val) {
        val = 1;
      }
      val = Number(val);
      if (val !== this.value) {
        this.value = val;
        Backbone.Mediator.publish('passengers:change', this.value);
      }
    }
  });

  return PassengersInput;
});
