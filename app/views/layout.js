(function (App) {
    App.Views.Layout = Backbone.View.extend({
        tagName: "div",
        className: "container-fluid",
        id: "layout",


        initialize: function () {
            //this.listenTo(vent, "creatingForm", this.showForm, this);
            //this.listenTo(vent, "editing", this.createForm, this);
            //this.listenTo(vent, "saveEdit", this.hideForm, this);
            //this.listenTo(vent, "saving", this.hideForm, this);
            //this.listenTo(vent, "canceling", this.hideForm, this);
            //this.listenTo(vent, "listShowing", this.hideForm, this);
            this.addChildViews()
                .cacheViewSelectors();
        },

        addChildViews: function () {
            var header = new App.Views.Header({
                model: new Backbone.Model({}),
                onCreate: this.showForm.bind(this),
                onList: this.showTable.bind(this)
            });

            var main = new App.Views.Main({
                model: new Backbone.Model({}),
                onCreate: this.showForm.bind(this),
                onList: this.showTable.bind(this)
            });


            //var addNewTasks = new App.Views.AddTaskView({
            //    collection: this.tasksCollection
            //});

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
            this.$show = this.$el.find("#showMenu");
            this.$table = this.$el.find("#tasks");
            this.$form = this.$el.find("#formForTask");
            return this;
        },

        showForm: function () {
            this.$show.hide(450);
            this.$table.hide(450);
            this.$form.show(450);
        },

        showTable: function () {
            this.$form.hide(450);
            this.$show.show(450);
            this.$table.show(450);

        },

        render: function () {
            return this.$el;
        }
    });
})(App, vent);