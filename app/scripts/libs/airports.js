'use strict';
define([
  'jquery',
  'lodash',
  'config'
], function ($, _, config) {
  var airportById = function (element, callback) {
    $.get('http://localhost:8000/search.php?i=' + element.val(), null, function (data) {
      callback(data[0]);
    });
  };

  var data = function (term, page) {
    return {
      s: term
    };
  };

  var results = function (data, page) {
    return {results: data};
  };

  var findArea = function (icao) {
    for (var i = 0; i < config.parameters.length; ++i) {
      var param = config.parameters[i];
      if (param.regex && icao.match(param.regex)) {
        return i;
      }
    }
    return config.parameters.length - 2;
  };

  var selectArea = function (fromCode, toCode) {
    var outside = config.parameters.length - 2;
    if (fromCode === outside && toCode === outside) {
      return config.parameters.length - 1;
    }
    return Math.max(fromCode, toCode);
  };

  var selectRange = function (dist) {
    for (var i = 0; i < config.distanceRanges.length; ++i) {
      if (config.distanceRanges[i].min && dist <= config.distanceRanges[i].min) {
        return i;
      }
    }
    return 0;
  };

  // Should select "greater of two", finland to western europe -> west europe
  // west europe to south europe -> south europe
  var parameters = function (from, to, range) {
    var i = selectArea(findArea(from.icao), findArea(to.icao));
    var p = config.parameters[i];
    return {
      name: p.name,
      co2factor: p.co2factor[range],
      ltoCycle: p.ltoCycle[range],
      load: p.load[range],
      freight: p.freight[range]
    };
  };

  return {
    ajax: {
      url: config.api + '/search.php',
      dataType: 'json',
      data: data,
      results: results
    },
    airportById: airportById,
    selectRange: selectRange,
    parameters: parameters
  };
});
