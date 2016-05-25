(function(App,vent) {
    App.Views.Header = Backbone.View.extend({
        tagName: "div",
        className: "container-fluid",
        id: "header",

        template: _.template (
            '<div class="row">'+
                '<h1>To Do List</h1>'+
                '<div class="navbar navbar-inverse">'+
                    '<div class="container">'+
                      '<div class="navbar-header pull-left">'+
                            '<button type="button" class="navbar-toggle pull-left btn-large" data-toggle="collapse" data-target="#responsive-menu">'+
                                '<span class="icon-bar"></span>'+
                                '<span class="icon-bar"></span>'+
                                '<span class="icon-bar"></span>'+
                            '</button>'+
                      '</div>'+
                      '<div class="collapse navbar-collapse" id="responsive-menu">'+
                            '<ul class="nav navbar-nav pull-right">'+
                                '<li><a href="#" id="list">List</a></li>'+
                                '<li><a href="#" id="create">Create</a></li>'+
                            '</ul>'+
                    '</div>'+
                '</div>'+
            '</div>'
        ),

        events:{
            "click #create": "onCreate",
            "click #list": "onTable"
        },

        onCreate: function(event){
            event.preventDefault();
            this.options.onCreate();
        },

        onTable: function(event){
            event.preventDefault();
            this.options.onList();
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