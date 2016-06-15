(function (App, vent) {
    App.Views.Main = Backbone.View.extend({
        id: "main-container",

        events: {
            "click .save": "addNewTask",
            "click .cancelNewTask": "clearInput",
            "click .editTask": "saveTaskEditing"
        },

        initialize: function (options) {
            this.listenTo(vent, "form", this.createForm);
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
                onEdit: this.editForm.bind(this)
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

        createForm: function (model) {
            if (document.querySelector("#formForTask")) {
                return;
            }
            if (model) {
                var taskForm = new App.Views.Form({
                    model: model,
                    editForm: this.editForm.bind(this),
                    editTask: this.editTask.bind(this)
                });
            } else {
                var taskForm = new App.Views.Form({
                    model: new Backbone.Model({})
                });
            }
            this.$el.append(taskForm.render());
            this.options.onCreate();
        },

        editForm: function (model) {
            this.options.onCreate();
            this.createForm(model);
            $("#saveButton").replaceWith('<button type="submit" class="btn btn-primary" id="saveEdit">SaveEdit</button>')
            this.$el.find("#task-name").val(model.get("taskName"));
            this.$el.find("#task-description").val(model.get("taskDescription"));
        },

        editTask: function(model){
            model.set("taskName", this.$el.find("#task-name").val());
            model.set("taskDescription", this.$el.find("#task-description").val());
            this.clearInput();
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