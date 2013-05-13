define([
  'lodash',
  'backbone',
  '../models/leg'
], function (_, Backbone, Leg) {

  // var stages = [];
  // var data = {};
  var num = 1;

  var Route = Backbone.Collection.extend({
    model: Leg,
    comparator: function (model) {
      return model.get('order');
    }
  });

  return Route;
});
