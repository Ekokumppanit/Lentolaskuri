'use strict';

define([
  'collections/route',
  'collections/results',
  'views/route',
  'views/leginput',
  'views/roundtrip',
  'views/passengers',
  'views/map',
  'views/total',
  'views/operation'
], function (Route, Results, RouteView, LegInput, RoundtripInput, PassengersInput, MapView, TotalView, OperationView) {

  var App = function () {
    this.initialize = function () {
      this.route = new Route();

      this.legInput = new LegInput({collection: this.route});
      this.roundtripInput = new RoundtripInput();
      this.passengersInput = new PassengersInput();

      this.routeView = new RouteView({collection: this.route});
      this.mapView = new MapView({collection: this.route});

      // Order is important. ResultsView requires that Route legs are
      // on dom as ResultView references from and to legs to calculate
      // position.
      this.results = new Results([], {route: this.route});
      this.totalView = new TotalView({model: this.results.total});

      new OperationView();
    };

    this.initialize();
  };

  return App;

});
