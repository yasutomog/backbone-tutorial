var app = app || {};

var Workspace = Backbone.Router.extend({

    routes: {
        '*filter': 'setFilter'
    },

    setFilter: function(param) {

        console.log('router_setFilter');

        app.TodoFilter = param || '';

        window.app.Todos.trigger('filter');
    }
});

app.TodoRouter = new Workspace();
Backbone.history.start();

