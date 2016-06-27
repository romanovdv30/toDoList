(function(App) {
    App.Views.TaskForm = Backbone.View.extend({
        id: "task-form",

        template: _.template(
           '<div id="form">'+
               '<header>'+
                   '<h3>Add new task</h3>'+
               '</header>'+
               '<div class="form-body">'+
                    '<label for="task-name">Task Name</label>'+
                    '<input type="text" class="form-control" id="task-name" name="taskName" placeholder="Enter task name">'+
                    '<label for="task-description">Task description</label>'+
                    '<input type="text" class="form-control" id="task-description" name="taskDescription" placeholder="Enter task description">'+
               '</div>'+
               '<footer>'+
                   '<button type="button" class="btn cancelNewTask">Cancel ' +
                            '<span class="glyphicon glyphicon-remove"></span>' +
                   '</button>'+
                   '<button type="button" class="btn save">Save ' +
                        '<span class="glyphicon glyphicon-folder-open"></span>' +
                   '</button>'+
               '</footer>'+
           '</div>'
        ),
        events:{
            "click .saveEdit" : "saveEditing",
            'change input' : 'applyChanges',
        },

        applyChanges(e) {
            this.model.set(e.target.name, e.target.value);
        },

        initialize: function(options) {
            this.options = options;
        },

        saveEditing: function(){
            this.options.onSave(this.model);
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