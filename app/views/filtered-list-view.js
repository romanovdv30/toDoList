(function (App) {
    App.Views.FilteredListView = Backbone.View.extend({
        id: "filtered-list",

        initialize: function (options) {
            this.options = options;
            this.addComponents();
        },

        addComponents: function () {
            this.components = {
                filter: new App.Views.Filter({
                    collection: this.collection
                }),
                tasksViews: new App.Views.TaskTable({
                    collection: this.collection,
                    showTaskForm: this.options.showTaskForm,
                    showEditForm: this.options.showEditForm
                })
            };
            return this;
        },

        render: function () {
            this.$el.append(
                this.components.filter.render()
                )
                .append(
                    this.components.tasksViews.render()
                );
            return this.$el;
        }
    });
})(App);