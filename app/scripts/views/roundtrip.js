'use strict';

define([
  'backbone',
  'backbone-mediator'
], function (Backbone) {
  var RoundtripInput = Backbone.View.extend({
    el: '.roundtripWidget',
    events: {
      'click button': 'click'
    },
    click: function (event, el) {
      this.$el.find('button').removeClass('active');
      var current = this.$el.find(event.currentTarget);
      current.addClass('active');

      Backbone.Mediator.publish('roundtrip:change', current.hasClass('roundtrip'));
    }
  });

  return RoundtripInput;
});
