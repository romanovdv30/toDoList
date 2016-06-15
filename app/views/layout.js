(function (App,vent) {
    App.Views.Layout = Backbone.View.extend({
        tagName: "div",
        className: "container-fluid",
        id: "layout",

        events: {
            "click #create": "createForm"

        },

        initialize: function () {
            this.addChildViews()
                .cacheViewSelectors();
        },

        addChildViews: function () {
            var header = new App.Views.Header({
                model: new Backbone.Model({}),
                onCreate: this.showForm.bind(this),
                onList: this.showTable.bind(this)
            });

            var main = new App.Views.Main({
                model: new Backbone.Model({}),
                onCreate: this.showForm.bind(this),
                onList: this.showTable.bind(this)
            });

            this.$el
                .append(
                    header.render()
                )
                .append(
                    main.render()
                )

            return this;
        },

        createForm: function(){
          vent.trigger("form");
        },

        cacheViewSelectors: function () {
            this.$show = this.$el.find("#showMenu");
            this.$table = this.$el.find("#tasks");
            return this;
        },

        showForm: function () {
            this.$show.hide(450);
            this.$table.hide(450);
        },

        showTable: function () {
            this.$el.find("#formForTask").remove();
            this.$show.show(450);
            this.$table.show(450);

        },

        render: function () {
            return this.$el;
        }
    });
})(App, vent);