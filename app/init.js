(function (App, w, _, $) {
    w.vent = _.extend({}, Backbone.Events);
    
    function initApp() {
       
    }

    function getAppInitialData() {
        
    }
    
    function renderApp() {
        App.layout =  new App.Views.AppLayout({
            model: new Backbone.Model({})
        });

        $('body').append(
            App.layout.render()
        );
    }
    
    $(function() {
        initApp();
        renderApp();
        getAppInitialData();
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