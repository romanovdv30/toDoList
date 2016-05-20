(function() {
    App.Views.Form = Backbone.View.extend({
        id: "newTask",

        template: _.template(
           '<form id="addTask" style="display:none;">'+
               '<div class="row">'+
                   '<div class="form-group col-xs-4 col-xs-offset-3">'+
                       '<h3>Add new task</h3>'+
                   '</div>'+
               '</div>'+
               '<div class="row">'+
                    '<div class="form-group col-xs-4 col-xs-offset-3">'+
                       ' <label for="task-name">Task Name</label>'+
                        '<input type="text" class="form-control" id="task-name" placeholder="Enter task name">'+
                    '</div>'+
               '</div>'+
               '<div class="row">'+
                   '<div class="form-group col-xs-4 col-xs-offset-3">'+
                        '<label for="task-description">Task description</label>'+
                        '<input type="text" class="form-control" id="task-description" placeholder="Enter task description">'+
                    '</div>'+
               '</div>'+
               '<div class="row">'+
                    '<div class="form-group col-xs-2 col-xs-offset-5">'+
                        '<div class="btn-group">'+
                            '<button type="submit" class="btn btn-primary" id="save">Save</button>'+
                        '</div> '+
                        '<div class="btn-group">'+
                           '<button type="button" class="btn btn-primary  " id="cancelNewTask">Cancel</button>'+
                        '</div> '+
                    '</div>'+
               '</div>'+
            '</form>'
        ),

        initialize: function() {

        },

        events:{
           "click #save": "saveNewTask",
           "click #cancelNewTask": "cancelForm"
        },

        cacheViewSelectors: function(){
            this.$taskName = this.$el.find("task-name");
            this.$taskDescription = this.$el.find("task-description");
        },

        render: function() {
            this.$el.append(
                this.template(
                    this.model.toJSON()
                )
            );
            this.cacheViewSelectors();
            return this.$el;
        },

        saveNewTask:function() {
           vent.trigger("saving");
           this.clearInput();
        },

        cancelForm: function(){
            vent.trigger("canceling");
            this.clearInput();
        },

        hide:function(timeout){
            this.$el.hide(timeout);
        },

        show:function(timeout){
            this.$el.show(timeout);
        },

        clearInput: function(){
            this.$taskName.val('');
            this.$taskDescription .val('');
        }
    });
})();