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
            this.listenTo(this.collection, "change destroy", this.render, this);
            this.options = options;
            this.children = [];
        },

        render: function () {            
            this.removeChildren();
            this.$el.html(this.template({}));
            this.$childContainer = this.$el.find("tbody");
            this.collection.each(this.renderTask, this);
            return this.$el;
        },

        sort: function (item) {
            this.collection.sortCollection(item);
            this.removeChildren();
            this.render();
        },

        removeChildren() {
            this.children.forEach(function(child) {
                child.remove();
            }); 
            this.children.length = 0;           
        },

        renderTask: function (task) {
            var taskComplete = task.get("complete");

            switch (this.collection.filterBy) {
                case "complete":
                    if (taskComplete === false) return;
                break;
                case "incomplete":
                    if (taskComplete === true) return;
            }

            var taskView = new App.Views.TaskView({
                index: this.collection.indexOf(task),
                model: task,
                showEditForm: this.options.showEditForm
            });
            this.children.push(taskView);
            this.$childContainer.append(taskView.render());
        },

        remove: function () {
            this.removeChildren();
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
})(App);