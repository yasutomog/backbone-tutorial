TodoMVC.module('TodoList', function(TodoList, App, Backbone, Marionette, $, _) {

    // TodoListのルーター
    // 未了または完了済の項目を表示させるためのルート
    TodoList.Router = Marionette.AppRouter.extend({
        appRouter: {
            '*filter': 'filterItems'
        }
    });

    // TodoListのコントローラー
    // アプリケーションレベルでのワークフローとロジックを制御
    TodoList.Controller = function() {
        this.todoList = new App.Todos.TodoList();
    };

    _.extend(TodoList.Controller.prototype, {
        
        // 適切なビューを表示して、Todo項目のリストを取得して、アプリケーションを開始する
        start: function() {
            this.showHeader(this.todoList);
            this.showFooter(this.todoList);
            this.showTodoList(this.todoList);

            this.todoList.fetch();
        },

        showHeader: function(todoList) {
            var header = new App.Layout.Header({
                collection: todoList
            });
            App.header.show(header);
        },

        showFooter: function(todoList) {
            var footer = new App.Layout.Footer({
				collection: todoList
			});
			App.footer.show(footer);
        },

        showTodoList: function(todoList) {
            App.main.show(new TodoList.Views.ListView({
                collection: todoList
            }));
        },

        filterItems: function(filter) {
            App.vent.trigger('todoList:filter', filter.trim() || '');
        }
    });

    TodoList.addInitializer(function() {
        var controller = new TodoList.Controller();
        new TodoList.Router({
            controller: controller
        });

        controller.start();
    });
});



