'use strict';

define([
  'handlebars'
], function (Handlebars) {
  Handlebars.registerHelper('displayFloat', function (num, precision) {
    precision = precision;
    return ''+(num.toFixed(precision)).replace('.', ',');
  });
});
