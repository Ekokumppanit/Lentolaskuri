'use strict';

var searchlocation = window.location;

define(function () {
  return {
    api: searchlocation + 'api',
    R: 6371,
    radiativeForceFactor: function (dist) {
      return (dist >= 500) ? 2.0 : 1.0;
    },
    distanceRanges: [{
      name: '0',
    }, {
      name: '500',
      min: 500
    }, {
      name: '1400',
      min: 1400
    }, {
      name: '5500',
      min: 5500,
    }, {
      name: '9000',
      min: 9000
    }],
    parameters: [{
      name: 'Suomi',
      regex: /^EF/,
      // Parameters for different distances
      co2factor: [0.08, 0.07, 0.07, 0.07, 0.07],
      ltoCycle: [15, 15, 15, 15, 15],
      load: [0.6, 0.65, 0.65, 0.65, 0.65],
      freight: [0.05, 0.05, 0.05, 0.05, 0.05]
    }, {
      name: 'Pohjois-Eurooppa',
      regex: /^E/,
      co2factor: [0.07, 0.06, 0.06, 0.06, 0.06],
      ltoCycle: [22, 22, 22, 22, 22],
      load: [0.65, 0.7, 0.75, 0.75, 0.75],
      freight: [0.05, 0.1, 0.1, 0.1, 0.1]
    }, {
      name: 'Etelä-Eurooppa',
      regex: /^L/,
      co2factor: [0.07, 0.07, 0.07, 0.07, 0.07],
      ltoCycle: [22, 22, 22, 22, 22],
      load: [0.65, 0.7, 0.8, 0.8, 0.8],
      freight: [0.05, 0.1, 0.1, 0.1, 0.1],
    }, {
      name: 'Euroopasta/aan',
      co2factor: [0.07, 0.07, 0.08, 0.09, 0.09],
      ltoCycle: [21, 24, 22, 26, 26], // 3rd value?
      load: [0.7, 0.7, 0.8, 0.8, 0.8],
      freight: [0.05, 0.15, 0.15, 0.15, 0.15]
    }, {
      name: 'Euroopan ulkopuoliset',
      co2factor: [0.08, 0.07, 0.08, 0.08, 0.09], // 2th value?
      ltoCycle: [21, 22, 23, 26, 26],
      load: [0.7, 0.7, 0.8, 0.8, 0.8],
      freight: [0.05, 0.1, 0.15, 0.2, 0.2]
    }],
    indirectRouteMultiplier: 1.09,
    // http://co2-raportti.fi/?heading=EU:n-p%C3%A4%C3%A4st%C3%B6kaupan-arvo-laski-kolmanneksen-t%C3%A4n%C3%A4-vuonna&page=ilmastouutisia&news_id=3665
    priceCO2: 7.5, // euros per tonne of CO2
  };
});
