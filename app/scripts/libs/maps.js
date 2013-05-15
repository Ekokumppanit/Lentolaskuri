'use strict';

define([
  'require',
  'jquery',
  'lodash',
  'backbone'
], function (require, $, _, Backbone) {
  var gmaps;

  function glatlng(latlng) {
    if (_.isArray(latlng)) {
      return new gmaps.LatLng(latlng[0], latlng[1]);
    } else if (latlng instanceof Backbone.Model) {
      return new gmaps.LatLng(latlng.get('lat'), latlng.get('long'));
    } else {
      return new gmaps.LatLng(latlng.lat, latlng.long);
    }
  }

  var maps = {};

  var deferred = $.Deferred();

  var i = 0;
  var Map = function (el, opts) {
    var num = i;
    deferred.done(function () {
      maps[num] = new gmaps.Map(el, {
        center: glatlng([0, 0]),
        mapTypeId: gmaps.MapTypeId.ROADMAP,
        zoom: 0,
        streetViewControl: false,
        mapTypeControl: false,
        draggable: false,
        scrollwheel: false,
        zoomControl: false
      });
    });

    return {
      id: i++
    };
  };

  var Line = function (attr) {
    var data;
    deferred.done(function () {
      attr = attr || {};
      attr.map = maps[attr.map.id];

      data = new gmaps.Polyline(attr);
    });

    return {
      clear: function () {
        deferred.done(function () {
          data.setPath([]);
        });
      },
      add: function (latlng) {
        deferred.done(function () {
          data.getPath().push(glatlng(latlng));
        });
      }
    };
  };

  var Bounds = function (map) {
    var map;
    var i;
    var data;

    var reset = function () {
      i = 0;
      map.setZoom(1);
      map.setCenter(glatlng([0, 0]));
    };

    deferred.done(function () {
      data = new gmaps.LatLngBounds();
      map = maps[map.id];

      reset();
    });

    return {
      clear: function () {
        deferred.done(function () {
          reset();
        });
      },
      add: function (latlng) {
        deferred.done(function () {
          data.extend(glatlng(latlng));
          ++i;
        });
      },
      use: function () {
        deferred.done(function () {
          if (i >= 2) {
            map.fitBounds(data);
          }
        });
      }
    };
  };

  require(['libs/gmaps'], function (_gmaps) {
    gmaps = _gmaps;
    deferred.resolve();
  });

  return {
    Map: Map,
    Line: Line,
    Bounds: Bounds
  };

});
