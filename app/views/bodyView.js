(function (App, vent) {
    App.Views.Main = Backbone.View.extend({
        id: "main-container",

        initialize: function () {
            this.addChildViews();
            this.cacheViewSelectors();
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

        cacheViewSelectors: function () {
            this.$tasks = this.$el.find("#tasks");
            return this;
        },

        createForm: function(model){
            this.taskForm = new App.Views.Form({
                model: model || new Backbone.Model({})
            });
            this.$el.append(this.taskForm.render());
            this.showForm();
        },

        showForm: function () {
            this.$tasks.hide(450);
            this.taskForm.hide(450);
        },

        hideForm: function () {
            this.taskForm.hide(450);
            this.$tasks.show(450);

        },

        render: function () {
            return this.$el;
        }
    });
})(App, vent);