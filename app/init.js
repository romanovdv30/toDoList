(function (App, w, _, $) {
    w.vent = _.extend({}, Backbone.Events);

    function renderApp() {
        App.layout =  new App.Views.AppLayout({
            model: new Backbone.Model({})
        });

        $('body').append(
            App.layout.render()
        );
    }
    
    $(function() {
        renderApp();
    });
})(
    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {}
    },
    window,
    _,
    $
);