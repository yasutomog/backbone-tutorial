var app = app || {};

// ToDoモデル
app.Todo = Backbone.Model.extend({

    defaults: {
        title: '',
        completed: false
    },

    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }

});

