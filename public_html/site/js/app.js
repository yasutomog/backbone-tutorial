var app = app || {};

$(function() {

//    var books = [
//        { title: 'Javascript: The Good Parts', author: 'Douglas Crockford', releaseDate: '2008', keywords: 'JavaScriptプログラミング' },
//        { title: 'The Little Book CoffeeScript', author: 'Alex MacCaw', releaseDate: '2012', keywords: 'CoffeeScriptプログラミング' },
//        { title: 'Scala for the Impatient', author: 'Cay S. Horstmann', releaseDate: '2012', keywords: 'Scalaプログラミング' },
//        { title: 'Anerican Psycho', author: 'Bret Easton Ellis', releaseDate: '1991', keywords: '斬新なスプラッター' },
//        { title: 'Elouquent', author: 'Marjn Haverbeke', releaseDate: '2011', keywords: 'JavaScriptプログラミング' }
//    ];
//
//    new app.LibraryView(books);
    $('#releaseDate').datepicker();
    new app.LibraryView();

});

