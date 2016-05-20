(function(){
     App.Models.Task = Backbone.Model.extend({
         
        defaults: {
            incomplete: true,
        },
         
        initialize: function(){
            console.log("New task was created");
            this.on("invalid", function(model,error){
                console.log(error);
            });
        }
    });
})();