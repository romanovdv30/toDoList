(function(App){
    App.Views.TaskView = Backbone.View.extend({
    tagName : "tr",
    className : "task",

    template:_.template(
            '<td><%=id%></td>'+
            '<td><%=taskName%></td>'+
            '<td><%=taskDescription%></td>'+
            '<td><input type="checkbox" class="check">' +
                '<span class="status">Incomplete</span>' +
            '</td>'+
            '<td>' +
                '<div class="btn-group task-btn-group">'+
            '<button type="button" class="editTask btn btn-primary">Edit</button>'  +
                '</div>'+
                '<div class="btn-group">'+
                    '<button type="button" class="del btn btn-primary">Delete</button>' +
                '</div>'+
            '</td>'
    ),

        initialize: function (options) {
            this.options = options;
            this.listenTo(this.model, "change", this.render, this);
            this.listenTo(this.model, "destroy", this.remove, this);
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
            "click .del": "destroyTask",
            "click .check": "changeStatus"
        },

        changeStatus: function () {
            if(this.model.get("incomplete")){
                this.model.set('incomplete',false);
                this.$el.addClass("complete");
                this.$el.find(".status").html("Complete");
                this.checked = true;

            } else {
                this.model.set('incomplete',true);
                this.$el.removeClass("complete");
                this.$el.find(".status").html("Incomplete");

                this.checked = false;
            }
        },

        editTask: function () {
            this.options.showEditForm(this.model);
        },

        destroyTask: function () {
            this.model.destroy();
        },

        remove: function () {
            this.$el.remove();
        }
});
})(App,vent);