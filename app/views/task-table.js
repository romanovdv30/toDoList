(function (App) {
    App.Views.TaskTable = Backbone.View.extend({
        id: "tasks",

        template: _.template(
            '<div>' +
                '<table class="table table-hover table-bordered">' +
                    '<thead class = "cursor-pointer">' +
                        '<tr class="active">' +
                            '<th class="id-column pointer">#</th>' +
                            '<th class="name-column pointer">Name</th>' +
                            '<th class="description-column pointer">Description</th>' +
                            '<th>Complete</th>' +
                            '<th>Edit link</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '</tbody>' +
                '<table>' +
            '</div>'
        ),

        events: {
            "click .id-column": "sortByTaskNumber",
            "click .name-column": "sortByTaskName",
            "click .description-column": "sortByTaskDescription"
        },

        sortByTaskNumber: function () {
            this.sort("id");
        },

        sortByTaskName: function () {
            this.sort("taskName");
        },

        sortByTaskDescription: function () {
            this.sort("taskDescription");
        },

        initialize: function (options) {
            this.listenTo(this.collection, "sorting", this.sort, this);
            this.listenTo(this.collection, "add", this.renderTask, this);
            this.listenTo(this.collection, "destroy", this.changeNumber, this);
            this.listenTo(this.collection, "change", this.render, this);
            this.options = options;
            this.children = [];
        },

        render: function () {
            this.children.forEach(function(item) {
                item.remove();
            });
            this.$el.append(this.template({}));
            this.$childContainer = this.$el.find("tbody");
            this.collection.each(this.renderTask, this);
            return this.$el;
        },

        changeNumber: function() {
           var models = this.collection.models;
           for ( var i = 0; i< models.length; i++ ){
               models[i].set("id", i+1);
           }
        },

        sort: function (item) {
            this.collection.sortCollection(item);
            this.$el.empty();
            this.render();
        },
        renderTask: function (task) {
            var taskComplete = task.get("complete");

            switch (this.collection.filterBy) {
                case "complete":
                    if (taskComplete === false) return;

                case "incomplete":
                    if (taskComplete === true) return;
            }

            var taskView = new App.Views.TaskView({
                model: task,
                showEditForm: this.options.showEditForm
            });
            this.children.push(taskView);
            this.$childContainer.append(taskView.render());
        },

        remove: function () {
            this.children.forEach(function(child) {
                child.remove();
            });
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
})(App);