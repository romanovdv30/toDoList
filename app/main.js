(function (App, w, _, $) {
    w.vent = _.extend({}, Backbone.Events);
    
    function initApp() {
       
    }

    function getAppInitialData() {
        
    }
    
    function renderApp() {

        var layout = new App.Views.Layout({
            model: new Backbone.Model({})
        });

        $('body').append(
            layout.render()
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