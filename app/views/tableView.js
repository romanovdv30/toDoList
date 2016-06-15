(function (App,vent) {
    App.Views.Table = Backbone.View.extend({
        id: "tasks",

        template: _.template(
            '<div>' +
                '<table class="table table-hover table-bordered">' +
                    '<thead >' +
                        '<tr class="active">' +
                            '<th class="id-column">#</th>' +
                            '<th class="name-column">Name</th>' +
                            '<th class="description-column">Description</th>' +
                            '<th>Complete state</th>' +
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
            this.options = options;
            this.children = [];
        },

        render: function () {
            this.$el.append(this.template({}));
            this.$childContainer = this.$el.find("tbody");
            this.collection.each(this.renderTask, this);

            return this.$el;
        },

        sort: function (item) {
            this.collection.sortCollection(item);
            this.$el.empty();
            this.render();
        },

        renderTask: function (task) {
            var taskView = new App.Views.TaskView({
                model: task,
                onEdit: this.options.onEdit
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
})(App,vent);