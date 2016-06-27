(function (App) {
    App.Views.TaskView = Backbone.View.extend({
        tagName: "tr",
        className: "task",

        template: _.template(
            '<td><%=id + 1%></td>' +
            '<td><%=taskName%></td>' +
            '<td><%=taskDescription%></td>' +
            '<td>' +
            '<input type="checkbox" class="task-complete-status" <%- complete ? "checked" : "" %> />' +
            '</td>' +
            '<td>' +
                '<span class="editTask glyphicon glyphicon-pencil"></span>' +
                '<span> | </span>' +
                '<span class="del glyphicon glyphicon-trash"></span>' +
            '</td>'
        ),

        events: {
            "click .editTask": "editTask",
            "click .del": "destroyTask",
            "change .task-complete-status": "toggleComplete"
        },

        initialize: function (options) {
            this.options = options;
            this.listenTo(this.model, "change", this.render, this);
            this.listenTo(this.model, "destroy", this.removeTask, this);
        },

        toggleComplete: function () {
            this.model.set("complete", !this.model.get('complete'));
        },

        render: function () {
            this.$el.html(
                this.template(
                    _.assign({ id: this.options.index }, this.model.attributes)
                )
            );
            return this.$el;
        },

        editTask: function () {
            this.options.showEditForm(this.model);
        },

        destroyTask: function () {
            this.model.destroy();
        }
    });
})(App);