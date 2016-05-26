(function (App, vent) {
    App.Views.Main = Backbone.View.extend({
        id: "main-container",
        events: {
            "click #save": "addNewTask",
            "click #cancelNewTask": "clearInput"

        },

        initialize: function (options) {
            this.options = options;
            this.addChildViews();
        },


        addChildViews: function () {
            this.tasksCollection = new App.Collections.Tasks([]);

            var showMenu = new App.Views.Show({
                collection: this.tasksCollection
            });
            var tasksViews = new App.Views.Table({
                collection: this.tasksCollection,
                onEdit: this.editTask.bind(this)
            });
            var taskForm = new App.Views.Form({
                model: new Backbone.Model({})
            });

            this.$el.append(
                showMenu.render()
                )
                .append(
                    tasksViews.render()
                )
                .append(
                    taskForm.render()
                );

            return this;
        },

        render: function () {
            return this.$el;
        },

        editTask:function(model){
          this.options.onCreate();
          this.$el.find("#task-name").val(model.get("taskName"));
          this.$el.find("#task-description").val(model.get("taskDescription"));
        },

        addNewTask: function () {
            var newTask = {
                id: this.tasksCollection.length + 1,
                taskName:  this.$el.find("#task-name").val(),
                taskDescription: this.$el.find("#task-description").val()
            };
            var newModel = new App.Models.Task(newTask);
            this.tasksCollection.add(newModel);
            this.clearInput();
        },

        clearInput: function () {
            this.$el.find("#task-name").val("");
            this.$el.find("#task-description").val("");
            this.options.onList();
        }
    });
})(App, vent);