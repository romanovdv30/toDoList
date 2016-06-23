(function(){
     App.Models.Task = Backbone.Model.extend({

        defaults: {
            complete: false
        },

        initialize: function(){
            console.log("New task was created");
            this.on("invalid", function(model,error){
                console.log(error);
            });
        }
    });
})();