(function (App, vent) {
    App.Views.FilteredListView = Backbone.View.extend({
        id: "filtered-list",

        initialize: function (options) {
            this.listenTo(vent, "form", this.createForm);
            this.options = options;
            this.addChildViews();
        },

        addChildViews: function () {
            var filter = new App.Views.Filter({
                collection: this.collection
            });
            var tasksViews = new App.Views.TaskTable({
                collection: this.collection,
                showTaskForm: this.options.showTaskForm
            });

            this.$el.append(
                filter.render()
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