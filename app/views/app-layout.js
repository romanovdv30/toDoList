(function (App,vent) {
    App.Views.AppLayout = Backbone.View.extend({
        tagName: "div",
        className: "container-fluid",
        id: "layout",

        events: {

        },

        initialize: function () {
            this.addChildViews()
                .cacheViewSelectors();
        },

        addChildViews: function () {
            var header = new App.Views.Header({
                model: new Backbone.Model({}),
                showTaskForm: this.showForm.bind(this),
                showTaskTable: this.showTable.bind(this)
            });

            var main = new App.Views.FilteredListView({
                model: new Backbone.Model({}),
                showTaskForm: this.showForm.bind(this),
                showTaskTable: this.showTable.bind(this)
            });

            this.$el
                .append(
                    header.render()
                )
                .append(
                    main.render()
                )

            return this;
        },

        cacheViewSelectors: function () {
            this.$taskTable = this.$el.find("#filtered-list");
            return this;
        },

        showTaskForm: function () {
            this.$taskTable.hide(450);
        },

        showTaskTable: function () {
            this.$el.find("#task-form").remove();
            this.$taskTable.show(450);
        },

        createForm: function (model) {
            if (document.querySelector("#formForTask")) {
                return;
            }
            if (model) {
                var taskForm = new App.Views.TaskForm({
                    model: model,
                    editForm: this.editForm.bind(this),
                    saveChanges: this.editTask.bind(this)
                });
            } else {
                var taskForm = new App.Views.TaskForm({
                    model: new Backbone.Model({})
                });
            }
            this.$el.append(taskForm.render());
            this.showTaskForm();
        },

        editForm: function (model) {
            this.options.showTaskForm();
            this.createForm(model);
            $("#saveButton").replaceWith('<button type="submit" class="btn btn-primary" id="saveEdit">SaveEdit</button>')
            this.$el.find("#task-name").val(model.get("taskName"));
            this.$el.find("#task-description").val(model.get("taskDescription"));
        },

        saveChanges: function(model){
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
            this.options.showTaskTable();
        },

        render: function () {
            return this.$el;
        }
    });
})(App, vent);