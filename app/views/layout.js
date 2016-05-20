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
           this.tasksCollection = new App.Collections.Tasks([]);
            
            var header = new App.Views.Header({
                model: new Backbone.Model({})
            });

            var tasksViews = new App.Views.Table({
                collection: this.tasksCollection
            });

            var addNewTasks = new App.Views.AddTaskView({
                collection: this.tasksCollection
            });

            var form = new App.Views.Form({
                model: new Backbone.Model({})
            });
            var edit = new App.Views.TaskEditForm({
                model: new Backbone.Model({})
            });
            
            this.$el
                .append(
                    header.render()
                )
                .append(
                tasksViews.render()
                )
                .append(
                    addNewTasks.render()
                )
                .append(
                    form.render()
                )
                .append(
                    edit.render()
                );
            
            return this;
        },

        cacheViewSelectors: function () {
            this.$tasks = this.$el.find("#tasks");
            this.$taskEdit = this.$el.find("#taskEdit");
            this.$newTask = this.$el.find("#newTask");

            return this;
        },

        showEditForm: function () {
            this.$tasks.hide(450);
            this.$taskEdit.hide(450);
            this.$taskEdit.show(450);
        },

        hideForm: function () {
            this.$newTask.hide(450);
            this.$taskEdit.hide(450);
            this.$tasks.show(450);

        },

        showForm: function () {
            this.$tasks.hide(450);
            this.$taskEdit.hide(450);
            this.$newTask.show(450);
        },
        
        render: function() {
            return this.$el;
        }
    });
})(App, vent);