(function (App) {
    App.Views.Filter = Backbone.View.extend({
        id: "showMenu",

        template: _.template(
            '<div>' +
                '<span>Show </span>' +
                '<div class="btn-group" role="group">' +
                    '<button type="button" class="btn btn-default" id="showAll">All</button>' +
                    '<button type="button" class="btn btn-default" id="showCompleted">Completed</button>' +
                    '<button type="button" class="btn btn-default" id="showNotCompleted">Not completed</button>' +
                '</div>' +
            '</div>'
        ),

        events: {
            "click #showCompleted": "showCompletedTasks",
            "click #showNotCompleted": "showIncompletedTasks",
            "click #showAll": "showAllTasks"

        },

        showCompletedTasks: function () {
            var models = this.collection.models;
            var tasks = $(".task");
            for (var i = 0; i < models.length; i++) {
                var model = models[i];
                if(!model.get("incomplete")) {
                    $(tasks[i]).css("display", "table-row");
                } else {
                   $(tasks[i]).css("display", "none");
                }
            }
        },

        showIncompletedTasks: function () {
            var models = this.collection.models;
            var tasks = $(".task");
            for (var i = 0; i < models.length; i++) {
                var model = models[i];
                if(model.get("incomplete")) {
                    $(tasks[i]).css("display", "table-row");
                } else {
                    $(tasks[i]).css("display", "none");
                }
            }
        },

        showAllTasks: function () {
            var models = this.collection.models;
            var tasks = $(".task");
            for (var i = 0; i < models.length; i++) {
                $(tasks[i]).css("display", "table-row");
            }
        },
        render: function () {
            this.$el.append(this.template({}));
            return this.$el;
        }
    });
})(App);