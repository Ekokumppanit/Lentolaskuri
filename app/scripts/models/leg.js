define([
  'backbone'
], function (Backbone) {

  var num = 1;

  var Leg = Backbone.Model.extend({
    initialize: function () {
      this.set('airportId', this.get('id'));
      this.set('id', num);
      ++num;
    },
    destroy: function () {
      this.trigger('destroy', this, this.collection, {});
    }
  });

  return Leg;

});
