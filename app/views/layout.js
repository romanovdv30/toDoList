(function (App, vent) {
    App.Views.Layout = Backbone.View.extend({
        tagName: "div",
        className: "container-fluid",
        id: "layout",

        initialize: function () {
            this.listenTo(vent, "creatingForm", this.showForm, this);
            this.listenTo(vent, "editing", this.showEditForm, this);
            this.listenTo(vent, "saveEdit", this.hideForm, this);
            this.listenTo(vent, "saving", this.hideForm, this);
            this.listenTo(vent, "canceling", this.hideForm, this);
            this.listenTo(vent, "listShowing", this.hideForm, this);
            //debugger;
            this.addChildViews()
                .cacheViewSelectors();
           
        },
        
        addChildViews: function() {

            var header = new App.Views.Header({
                model: new Backbone.Model({}),
                onCreate: this.createForm.bind(this)
            });

            var main = new App.Views.Main ({
                model: new Backbone.Model({})
            });

            //

            //
            //var addNewTasks = new App.Views.AddTaskView({
            //    collection: this.tasksCollection
            //});

            this.$el
                .append(
                    header.render()
                )
                .append(
                    main.render()
                );
                //.append(
                //    addNewTasks.render()
                //)

            return this;
        },
        createForm: function(model){
            this.taskForm = new App.Views.Form({
                model: model || new Backbone.Model({})
            });
            this.$el.append(this.taskForm.render());
            this.showForm();
        },

        cacheViewSelectors: function () {
            this.$tasks = this.$el.find("#tasks");

            return this;
        },

        hideForm: function () {
            this.taskForm.hide(450);
            this.$tasks.show(450);

        },

        showForm: function () {
            this.$tasks.hide(450);
            this.taskForm.hide(450);
        },
        
        render: function() {
            return this.$el;
        }
    });
})(App, vent);