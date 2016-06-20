(function(App) {
    App.Views.Header = Backbone.View.extend({
        tagName: "div",
        className: "container-fluid",
        id: "header",

        template: _.template (
            '<div class="row">'+
                '<div class="navbar navbar-inverse">'+
                    '<div class="container">'+
                      '<div class="navbar-brand">To Do List</div>'+
                      '<div class="navbar-header pull-left">'+
                            '<button type="button" class="navbar-toggle pull-right btn-large" data-toggle="collapse" data-target="#responsive-menu">'+
                                '<span class="icon-bar"></span>'+
                                '<span class="icon-bar"></span>'+
                                '<span class="icon-bar"></span>'+
                            '</button>'+
                      '</div>'+
                      '<div class="collapse navbar-collapse" id="responsive-menu">'+
                            '<ul class="nav navbar-nav pull-right">'+
                                '<li><button type="button" class="tasks-btn btn btn-link">Tasks</button></li>'+
                                '<li><button type="button" class="create-btn btn btn-link">Create</button></li>'+
                            '</ul>'+
                    '</div>'+
                '</div>'+
            '</div>'
        ),

        events:{
            "click .tasks-btn": "showTaskTable",
            "click .create-btn":"showTaskForm"
        },

        showTaskTable: function(){
            this.options.showTaskTable();
        },

        showTaskForm: function(){
            this.options.showTaskForm();
        },

        initialize: function(options) {
            this.options = options;
        },

        render: function() {
            this.$el.append(
                this.template(
                    this.model.toJSON()
                )
            );
            return this.$el;
        }
    });
})(App,vent);