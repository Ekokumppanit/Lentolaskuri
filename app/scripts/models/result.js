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
      lto: 0,
      co2factor: 0,
      ltoCycle: 0,
      load: 0,
      freight: 0
    },
    initialize: function (attr, options) {
      if (this.get('from') && this.get('to')) {
        this.set('dist', Math.haversine(this.get('from'), this.get('to')));
      }

      this.calculate.apply(this);
    },
    calculate: function () {
      var roundtrip = 0;
      if (this.get('from') && this.get('to')) {
        var roundtripFactor = (roundtrip) ? 2.0 : 1.0; // fuu

        this.set('range', airports.selectRange(this.get('dist')));
        this.set(airports.parameters(this.get('from').toJSON(), this.get('to').toJSON(), this.get('range')));

        var dist = this.get('dist') * config.indirectRouteMultiplier;

        var m = config.radiativeForceFactor(dist) * (1 - this.get('freight')) * (1 / this.get('load'));
        this.set('lto', m * this.get('ltoCycle'));
        this.set('total', m * this.get('co2factor') * dist + this.get('lto'));
      }
    }
  });

  return Result;
});
