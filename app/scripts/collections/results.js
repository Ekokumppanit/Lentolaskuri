'use strict';

define([
  'backbone',
  'models/result',
  'models/total'
], function (Backbone, Result, Total) {
  var Results = Backbone.Collection.extend({
    model: Result,
    initialize: function (model, opts) {
      this.route = opts.route;

      this.route.on('add', this.newLeg, this);
      this.route.on('remove', this.calculate, this);
      this.route.on('sort', this.calculate, this);

      this.total = new Total();
    },
    newLeg: function (model, collection, options) {
      if (this.route.length < 2) {
        return;
      }
      var from;
      if (this.length > 0) {
        from = this.route.get(this.last().get('to'));
      } else {
        from = this.route.first();
      }

      var result = new Result({from: from, to: model});
      this.push(result);
      this.total.add(result);
    },
    calculate: function (model, collection, options) {
      var models = [];
      this.total.reset();

      var prev = null;
      this.route.forEach(function (leg) {
        if (prev) {
          var result = new Result({from: prev, to: leg});
          models.push(result);
          this.total.add(result);
        }
        prev = leg;
      }.bind(this));

      this.reset(models);
    }
  });

  return Results;
});
