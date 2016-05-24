(function (App, vent) {
    App.Views.Main = Backbone.View.extend({
        id: "main-container",
        className: "container-fluid",

        initialize: function () {
            this.addChildViews();
        },

        addChildViews: function () {
            this.tasksCollection = new App.Collections.Tasks([]);

            var showMenu = new App.Views.Show({
                collection: this.tasksCollection
            });
            var tasksViews = new App.Views.Table({
                collection: this.tasksCollection,
                onEdit: this.createForm.bind(this)
            });

            this.$el.append(
                showMenu.render()
                )
                .append(
                    tasksViews.render()
                )
            return this;
        },

        render: function () {
            return this.$el;
        }
    });
})(App, vent);