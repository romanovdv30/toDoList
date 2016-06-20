(function(App){
    App.Views.TaskView = Backbone.View.extend({
    tagName : "tr",
    className : "task",

    template:_.template(
            '<td><%=id%></td>'+
            '<td><%=taskName%></td>'+
            '<td><%=taskDescription%></td>'+
            '<td>' +
                '<input type="checkbox" class="check">'+
            '</td>'+
            '<td>' +
                '<span class="editTask glyphicon glyphicon-pencil"></span>'  +
                '<span> | </span>'+
                '<span class="del glyphicon glyphicon-trash"></span>' +
            '</td>'
    ),

        initialize: function (options) {
            this.options = options;
            this.listenTo(this.model, "change", this.render, this);
            this.listenTo(this.model, "destroy", this.removeTask, this);
        },

        render: function () {
            this.$el.html(
                this.template(
                    this.model.toJSON()
                )
            );
            return this.$el;
        },

        events: {
            "click .editTask": "editTask",
            "click .del": "destroyTask"
        },


        editTask: function () {
            this.options.showEditForm(this.model);
        },

        destroyTask: function () {
            this.model.destroy();
        },

        removeTask: function () {
            this.$el.remove();
        }
});
})(App,vent);