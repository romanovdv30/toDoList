(function (App,vent) {
    App.Views.Table = Backbone.View.extend({
        id: "tasks",

        template: _.template(
            '<div>' +
                '<table class="table table-hover table-bordered">' +
                    '<thead >' +
                        '<tr class="active">' +
                            '<th id="number-column">#</th>' +
                            '<th id="name-column">Name</th>' +
                            '<th id="description-column">Description</th>' +
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
            "click #showCompleted": "showCompletedTasks",
            "click #showNotCompleted": "showIncompletedTasks",
            "click #showAll": "showAllTasks",
            "click #number-column": "sortByTaskNumber",
            "click #name-column": "sortByTaskName",
            "click #description-column": "sortByTaskDescription"

        },

        sortByTaskNumber: function () {
            this.sort("number");
        },

        sortByTaskName: function () {
            this.sort("taskName");
        },

        sortByTaskDescription: function () {
            this.sort("taskDescription");
        },

        showCompletedTasks: function () {
            var elemsIn = this.$el.find(".incomplete");
            for (var i = 0; i < elemsIn.length; i++) {
                $(elemsIn[i]).css("display", "none");
            }
            var elemsCompl = this.$el.find(".complete");
            for (var i = 0; i < elemsCompl.length; i++) {
                $(elemsCompl[i]).css("display", "table-row");
            }
        },

        showIncompletedTasks: function () {
            var elemsCompl = this.$el.find(".complete");
            for (var i = 0; i < elemsCompl.length; i++) {
                $(elemsCompl[i]).css("display", "none");
            }
            var elemsIn = this.$el.find(".incomplete");
            for (var i = 0; i < elemsIn.length; i++) {
                $(elemsIn[i]).css("display", "table-row");
            }
        },

        showAllTasks: function () {
            var elems = this.$el.find(".task");
            for (var i = 0; i < elems.length; i++) {
                $(elems[i]).css("display", "table-row");
            }
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