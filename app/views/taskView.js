(function(App,vent){
    App.Views.TaskView = Backbone.View.extend({
    tagName : "tr",
    className : "task incomplete",

    template:_.template(
            '<td><%=id%></td>'+
            '<td><%=taskName%></td>'+
            '<td><%=taskDescription%></td>'+
            '<td><input type="checkbox" class="check">' +
                '<span class="status">Incomplete</span>' +
            '</td>'+
            '<td class="active">' +
                '<div class="btn-group">'+
                    '<input type="button" class="btn btn-primary edit" value="Edit">' +
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
            this.listenTo(vent, "saveEdit", this.saveChanges, this);

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
            "click .edit": "editRecord",
            "click .del": "destroyTask",
            "click .check": "changeStatus"
        },

        changeStatus: function (event) {
            if(this.model.get("incomplete")){
                this.model.set('incomplete',false);
                this.$el.find(".status").html("Complete");
                event.currentTarget.checked = true;
            } else {
                this.model.set('incomplete',true);
                this.$el.find(".status").html("Incomplete");
                event.currentTarget.checked = false;
            }
        },

        editRecord: function () {
            this.options.onEdit(this.model);
        },

        saveChanges: function (args) {
            this.model.set("taskName", args[0]);
            this.model.set("taskDescription", args[1]);
        },

        destroyTask: function () {
            this.model.destroy();
        },

        remove: function () {
            this.$el.remove();
        }
});
})(App,vent);