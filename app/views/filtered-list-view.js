(function (App, vent) {
    App.Views.FilteredListView = Backbone.View.extend({
        id: "filtered-list",

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

            var showMenu = new App.Views.Filter({
                collection: this.tasksCollection
            });
            var tasksViews = new App.Views.TaskTable({
                collection: this.tasksCollection
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

    });
})(App, vent);