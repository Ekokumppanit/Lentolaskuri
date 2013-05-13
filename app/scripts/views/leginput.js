'use strict';

define([
  'backbone',
  'models/leg',
  'views/dropdown',
  'libs/airports',
  'Template'
], function (Backbone, Leg, Dropdown, airports, Template) {
  var LegInput = Backbone.View.extend({
    el: '.legInputWidget',
    events: {
      'click button': 'openDropdown'
    },
    initialize: function () {
      this.dropdown = new Dropdown({
        el: this.$el.find('input'),
        select2: {
          initSelection: airports.airportById,
          formatResult: Template.choice,
          formatSelection: Template.choice,
          minimumInputLength: 1,
          ajax: airports.ajax
        }
      });

      this.dropdown.bind('new-leg', this.newLeg, this);
    },
    openDropdown: function () {
      this.dropdown.open();
    },
    newLeg: function (data) {
      this.collection.push(new Leg(data));
    }
  });

  return LegInput;
});

