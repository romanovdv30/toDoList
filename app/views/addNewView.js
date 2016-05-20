(function () {
    App.Views.AddTaskView = Backbone.View.extend({
        el: "#addTask",

        events: {
            "click #save": "submit",
            "click #cancelNewTask": "clearInput"
        },

        submit: function () {
            var newTask = {
                number: (this.collection.length + 1),
                taskName: this.$el.find("#task-name").val(),
                taskDescription: this.$el.find("#task-description").val()
            };
            var newModel = new App.Models.Task(newTask);
            this.collection.add(newModel);
            this.clearInput();
        },

        clearInput: function () {
            this.$el.find("#task-name").val("");
            this.$el.find("#task-description").val("");
        }
    });
})();

