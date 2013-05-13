'use strict';

define([
  'backbone',
  'backbone-mediator',
  'libs/math',
  'libs/airports',
  'config'
], function (Backbone, BackboneMediator, Math, airports, config) {
  var Result = Backbone.Model.extend({
    defaults: {
      dist: 0,
      total: 0,
      rawTotal: 0,
      alone: true,
      roundtrip: false,
      passengers: 1,
      price: 0
    },
    initialize: function () {
      Backbone.Mediator.subscribe('roundtrip:change', this.set.bind(this, 'roundtrip'));
      Backbone.Mediator.subscribe('passengers:change', this.set.bind(this, 'passengers'));
      Backbone.Mediator.subscribe('passengers:change', function (num) {
        this.set('alone', num === 1);
      }.bind(this));

      this.on('change:roundtrip change:passengers', this.calc, this);
    },
    reset: function () {
      this.set('dist', 0);
      this.set('total', 0);
      this.set('rawTotal', 0);
      this.set('price', 0);
    },
    calc: function () {
      var mult = this.get('roundtrip') ? 2 : 1;
      this.set('total', mult * this.get('passengers') * this.get('rawTotal'));
      this.set('price', this.get('total') / 1000 * config.priceCO2);
    },
    add: function (another) {
      var keys = {
        'dist': 'dist',
        'total': 'rawTotal'
      };
      for (var i in keys) {
        this.set(keys[i], this.get(keys[i]) + another.get(i));
      }

      this.calc();
    }
  });

  return Result;
});
