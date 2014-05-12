TodoMVC.module('Layout', function(Layout, App, Backbone, Marionette, $, _) {

    // ヘッダViewのレイアウト
    Layout.Header = Marionette.ItemView.extend({
        template: '#template-header',

        // UIの関連付け
        // jQueryセレクタで指定されたオブジェクトが属性としてキャッシュされる
        ui: {
            input: '#new-todo'
        },

        events: {
            'keypress #new-todo': 'onInputKeypress'
        },

        onInputKeypress: function(evt) {
            var ENTER_KEY = 13;
            var todoText = this.ui.input.val().trim();

            if (evt.which === ENTER_KEY && todoText) {
                this.collection.create({
                    title: todoText
                });
                this.ui.input.val('');
            }
        }
    });

    // フッターのViewレイアウト
    Layout.Footer = Marionette.Layout.extend({
        template: '#template-footer',

        ui: {
            count: '#todo-count strong',
            filters: '#filters a'
        },

        events: {
            'click #clear-completed': 'onClearClick'
        },

        initialize: function() {
            this.listenTo(App.vent, 'todoList:filter', this.updateFilterSelection);
            this.listenTo(this.collection, 'all', this.updateCount);
        },

        onRender: function() {
            this.updateCount();
        },

        updateCount: function() {
            var count = this.collection.getActive().length;
            this.ui.count.html(count);

            if (count === 0) {
                this.$el.parent().hide();
            } else {
                this.$el.parent().show();
            }
        },

        updateFilterSelection: function(filter) {
            this.ui.filters
                .removeClass('selected')
                .filter('[href="#' + filter + '"]')
                .addClass('selected');
        },

        onClearClick: function() {
            var completed = this.collection.getCompleted();
            completed.forEach(function destroy(todo){
                todo.destroy();
            });
        }
    });
});

