'use strict';

define([
  'backbone',
  'libs/maps'
], function (Backbone, Maps) {

  var MapView = Backbone.View.extend({
    el: '#gmap',
    initialize: function () {
      this.collection.on('sort', this.render, this);
      this.collection.on('remove', this.render, this);
      this.collection.on('add', this.add, this);

      this.map = new Maps.Map(this.el);

      this.route = new Maps.Line({
        geodesic: true,
        map: this.map,
        strokeColor: '#000'
      });

      this.bounds = new Maps.Bounds(this.map);
    },
    render: function () {
      this.route.clear();
      this.bounds.clear();
      this.collection.forEach(this.route.add);
      this.collection.forEach(this.bounds.add);
      this.bounds.use();
    },
    add: function (model, collection, options) {
      this.route.add(model);
      this.bounds.add(model);
      this.bounds.use();
    }
  });

  return MapView;

});
