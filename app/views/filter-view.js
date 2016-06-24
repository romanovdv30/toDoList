(function (App) {
    App.Views.Filter = Backbone.View.extend({
        id: "showMenu",

        template: _.template(
            '<div>' +
            '<span>Show </span>' +
            '<div class="btn-group buttons" role="group">' +
            '<button type="button" class="btn btn-default <%- filterBy === "all" ? "active" : "" %>" data-filter-by="all">All</button>' +
            '<button type="button" class="btn btn-default <%- filterBy === "complete" ? "active" : "" %>" data-filter-by="complete">Completed</button>' +
            '<button type="button" class="btn btn-default <%- filterBy === "incomplete" ? "active" : "" %>" data-filter-by="incomplete">Not completed</button>' +
            '</div>' +
            '</div>'
        ),

        events: {
            "click [data-filter-by]": "toggleFilter"
        },

        initialize() {
            this.collection.filterBy = this.collection.filterBy || 'all';
            this.listenTo(this.collection, 'change', this.render);
        },

        toggleFilter: function ( e ) {
            this.collection.filterBy = e.target.dataset.filterBy;
            this.collection.trigger('change');
        },

        render: function () {
            return this.$el.html(
                this.template({ filterBy: this.collection.filterBy })
            );
        }
    });
})(App);