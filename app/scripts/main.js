'use strict';

require.config({
  map: {
    '*': {
      'underscore': 'lodash'
    }
  },
  paths: {
    jquery: '../components/jquery/jquery',
    bootstrap: '../scripts/bootstrap',
    select2: '../components/select2/select2',
    lodash: '../components/lodash/lodash',
    handlebars: 'handlebars.runtime',
    Template: '../scripts/templates',
    'jquery-ui-core': '../components/jquery-ui/ui/jquery.ui.core',
    'jquery-ui-mouse': '../components/jquery-ui/ui/jquery.ui.mouse',
    'jquery-ui-widget': '../components/jquery-ui/ui/jquery.ui.widget',
    'jquery-ui-sortable': '../components/jquery-ui/ui/jquery.ui.sortable',
    async: '../components/requirejs-plugins/src/async',
    backbone: '../components/backbone/backbone',
    'backbone-mediator': '../components/Backbone-Mediator/backbone-mediator'
  },
  shim: {
    backbone: {
      deps: ['lodash'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    select2: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    'jquery-ui-core': {
      deps: ['jquery'],
      exports: 'jquery'
    },
    'jquery-ui-sortable': {
      deps: ['jquery-ui-core', 'jquery-ui-widget', 'jquery-ui-mouse'],
      exports: 'jquery'
    }
  }
});

require([
  'jquery',
  'app',
  'bootstrap',
  'libs/handlebar_helpers'
], function ($, App) {
  $('html:first').removeClass('no-js').addClass('js'); // JavaScript detection
  var app = new App();
});
