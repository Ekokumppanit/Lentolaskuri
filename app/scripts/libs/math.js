'use strict';
define([
  'config',
  'libs/airports'
], function (cfg, airports) {
  var toRad = function toRad(n) {
    return n * Math.PI / 180;
  };

  var haversine = function haversine(from, to) {
    var dLat = toRad(to.get('lat') - from.get('lat'));
    var dLon = toRad(to.get('long') - from.get('long'));
    var lat1 = toRad(from.get('lat'));
    var lat2 = toRad(to.get('lat'));

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return cfg.R * c;
  };

  return {
    toRad: toRad,
    haversine: haversine
  };
});
