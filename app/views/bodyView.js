(function (App, vent) {
    App.Views.Main = Backbone.View.extend({
        id: "main-container",

        events: {
            "click .save": "addNewTask",
            "click .cancelNewTask": "clearInput",
            "click edit": "editForm"
        },

        initialize: function (options) {
            this.listenTo(vent, "form", this.createForm);
            this.options = options;
            this.addChildViews();
        },

        createForm: function (model) {
            if (document.querySelector("#formForTask")) {
                return;
            }
            if (model) {
                var taskForm = new App.Views.Form({
                    model: model,
                    editForm: this.editForm.bind(this)
                });
            } else {
                var taskForm = new App.Views.Form({
                    model: new Backbone.Model({})
                });
            }
            this.$el.append(taskForm.render());
            this.options.onCreate();
        },
        editForm: function(){

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


            this.$el.append(
                showMenu.render()
                )
                .append(
                    tasksViews.render()
                );

            return this;
        },

        render: function () {
            return this.$el;
        },


        editTask: function (model) {
            this.options.onCreate();
            this.createForm(model);
            this.$el.find("#task-name").val(model.get("taskName"));
            this.$el.find("#task-description").val(model.get("taskDescription"));
        },

        addNewTask: function () {
            var newTask = {
                id: this.tasksCollection.length + 1,
                taskName: this.$el.find("#task-name").val(),
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