(function() {
    App.Views.TaskEditForm = Backbone.View.extend({
        id:"taskEdit",
        template: _.template(
            ' <form>'+
                '<div class="row">'+
                    '<div class="form-group col-xs-4 col-xs-offset-3">'+
                        '<h3>Edit task</h3>'+
                    '</div>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="form-group col-xs-4 col-xs-offset-3">'+
                        ' <label for="edit-name">Task Name</label>'+
                        '<input type="text" class="form-control" id="edit-name" placeholder="Enter task name">'+
                    '</div>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="form-group col-xs-4 col-xs-offset-3">'+
                        '<label for="edit-description">Task description</label>'+
                        '<input type="text" class="form-control" id="edit-description" placeholder="Enter task description">'+
                    '</div>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="form-group col-xs-4 col-xs-offset-5">'+
                        '<div class="btn-group">'+
                            '<button type="button" class="btn btn-primary" id="saveEditing">Save editing</button>'+
                        '</div> '+
                        '<div class="btn-group">'+
                            '<button type="button" class="btn btn-primary  " id="cancelEditing">Cancel editing</button>'+
                        '</div> '+
                    '</div>'+
                '</div>'+
            '</form>'
        ),

        initialize: function() {
            this.$el.hide();
            this.listenTo(vent,"editing",this.enterInput,this);

            this.cacheViewSelectors();
        },

        events: {
            "click #saveEditing": "saveEditing",
            "click #cancelEditing":"cancelEditing"
        },

        cacheViewSelectors:function() {
            this.$editName = this.$el.find("#edit-name");
            this.$editDescription = this.$el.find("#edit-description");
        },

        cancelEditing:function(){
            vent.trigger("canceling");
            this.clearInput();
        },

        saveEditing:function() {
            vent.trigger("saveEdit",[
                this.$editName.val(),
                this.$editDescription.val()
            ]);
            this.clearInput();
        },

        render: function() {
            this.$el.append(
                this.template(
                    this.model.toJSON()
                )
            );
            return this.$el;
        },

        enterInput:function(args){
            this.$editName.val(args[0]);
            this.$editDescription.val(args[1]);
        },

        clearInput: function(){
            this.$editName.val('');
            this.$editDescription.val('');
        }
    });
})();

