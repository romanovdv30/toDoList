(function(App) {
    App.Views.Form = Backbone.View.extend({
        id: "formForTask",

        template: _.template(
           '<form id="addTask">'+
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
                            '<button type="submit" class="btn btn-primary save">Save</button>'+
                        '</div> '+
                        '<div class="btn-group">'+
                           '<button type="button" class="btn btn-primary  cancelNewTask">Cancel</button>'+
                        '</div> '+
                    '</div>'+
               '</div>'+
            '</form>'
        ),

        initialize: function() {
        },

        render: function() {
            this.$el.append(
                this.template(
                    this.model.toJSON()
                )
            );

            return this.$el;
        }

    });
})(App);