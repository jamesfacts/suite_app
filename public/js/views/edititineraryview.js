App.Views.EditItineraryView = Backbone.View.extend({
    el: '#edit-itinerary',

    initialize: function () {
        if (App.Collections.stopsByUser) {
            this.collection = App.Collections.stopsByUser
        } else {
            App.Collections.stopsByUser = new App.Collections.IndividualItineraryCollection();
            this.collection = App.Collections.stopsByUser
            };
            
        this.template = Handlebars.compile( $('#edit-itinerary-template').html() );
        // this.listenTo(this.collection, 'add', this.addStop);
        // this.listenTo(this.collection, 'remove', this.deleteStop)
    },

    events: {
        'click .single-stop'        :   'toggleStop'
    },

    toggleStop: function (stopClicked) {
        var clickedState = $(stopClicked.target.closest('span'));
        var stopId = stopClicked.target.closest('li').dataset.gStopId;
       
        var stopChanged = this.stopSearch(stopId); 
       
        if (clickedState.hasClass('delete-stop')) {
            clickedState.removeClass('delete-stop');
            clickedState.html('[+]');
            clickedState.addClass('add-stop');
            App.editStops[stopChanged].saved = false;
        } else {
            clickedState.removeClass('add-stop');
            clickedState.html('[-]');
            clickedState.addClass('delete-stop');
            App.editStops[stopChanged].saved = true;
        }

    },

    stopSearch: function (stopId) {
      for (i = 0; i < App.editStops.length; i++) {
        if (App.editStops[i].g_place_id === stopId) 
          { 
            return i;
          }
      }
      return -1;
    },

    save: function () {
        var cityId = App.clickedItineraryId;

        // -> delete everything from server
        // this.collection.forEach(function(singleStop){
        //   debugger;
        //   console.log(singleStop);
        //   this.collection.get(singleStop.id).destroy();
        // }.bind(this));

        //var toDelete = this.collection.length;

        for (var i = this.collection.length-1; i >= 0; i--) {
            this.collection.models[i].destroy();
        };


        //iterate through array and if 'saved === true'

        App.editStops.forEach(function(singleStop){
          if (singleStop.saved === true) {
              this.collection.add({
              city_id: cityId,
              g_stop_id: singleStop.g_place_id,
              name: singleStop.name
            }).save();
          }
        }.bind(this));

       App.editStops = [];

    },

    retrieveAllStops: function () {
        var place_id = App.currentCity;

        $.ajax({
            url: '/city-stops/' + place_id,
            method: 'GET',
            dataType: 'json'
        }).done(this.sortStops.bind(this));
    },

    sortStops: function (allStops) {
        var i = 0;

        allStops.forEach( function(singleStop) {
            if ( !(this.collection.findWhere({g_stop_id: singleStop.g_stop_id})) )
                { singleStop.saved = false }
            else 
                { singleStop.saved = true }
        }.bind(this));

        App.editStops = allStops;
        this.renderAllStops();
    },

    renderAllStops: function () {
        
        var renderData = {
            userName: App.clickedItineraryUser,
            itineraryId: App.clickedItineraryId,
            stop: App.editStops
        };

        this.$el.html( this.template(renderData)  );
        this.show();
    },

    show: function() {
        this.$el.show();
    },

    hide: function() {
        this.$el.hide();
    }

});