(function () {
    App.Views.Show = Backbone.View.extend({
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
        render: function () {
            this.$el.append(this.template({}));
            return this.$el;
        }
    });
})();