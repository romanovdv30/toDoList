(function (App, Collection) {

    App.Collections.Tasks = Collection.extend({
        model: App.Models.Task,
        sortItem: "id",
        url: './data/data.json',

        comparator: function (item) {
            return item.get(this.sortItem);
        },

        sortCollection: function (newItem) {
            this.sortItem = newItem;
            this.sort();
        },

        initialize: function () {
            debugger;
            this.fetch();
        }
    });

})(App, Backbone.Collection);
