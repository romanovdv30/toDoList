(function (App) {
    App.Views.AppLayout = Backbone.View.extend({
        tagName: "div",
        id: "layout",

        events: {
            "click .save": "addNewTask",
            "click .cancelNewTask": "clearInput"
        },

        initialize: function () {
            this.addComponents();
        },

        addComponents: function () {
            this.tasksCollection = new App.Collections.Tasks([]);
            this.components = {
                header: new App.Views.Header({
                    model: new Backbone.Model({}),
                    showTaskForm: this.showTaskForm.bind(this),
                    showTaskTable: this.showTaskTable.bind(this)
                }),
                main: new App.Views.FilteredListView({
                    model: new Backbone.Model({}),
                    collection: this.tasksCollection,
                    showEditForm: this.showEditForm.bind(this),
                    showTaskForm: this.showTaskForm.bind(this),
                    showTaskTable: this.showTaskTable.bind(this)
                })
            };
            return this;
        },

        cacheViewSelectors: function () {
            this.$taskTable = this.$el.find("#filtered-list");
            return this;
        },

        hideTaskTable: function () {
            this.$taskTable.hide(450);
        },

        showTaskTable: function () {
            this.$el.find("#task-form").remove();
            this.$taskTable.show(450);
        },

        showTaskForm: function (model) {
            if (document.querySelector("#task-form")) {
                return;
            }
            var taskForm = new App.Views.TaskForm({
                model: model || new Backbone.Model({}),
                onSave: this.saveChanges.bind(this)
            });

            this.$el.append(taskForm.render());
            this.hideTaskTable();
        },

        showEditForm: function (model) {
            this.showTaskForm(model);
            $("button.save").replaceWith(
                '<button type="button" class="btn btn saveEdit">Save Changes ' +
                '<span class="glyphicon glyphicon-folder-open"></span>' +
                '</button>');
            this.$el.find("#task-name").val(model.get("taskName"));
            this.$el.find("#task-description").val(model.get("taskDescription"));
        },

        saveChanges: function (model) {
            this.tasksCollection.push(model, {merge: true});
            this.showTaskTable();
        },

        addNewTask: function () {
            var newTask = {
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
            this.showTaskTable();
        },

        render: function () {
            this.$el
                .append(
                    this.components.header.render()
                )
                .append(
                    this.components.main.render()
                );
            this.cacheViewSelectors();
            return this.$el;
        }
    });
})(App);