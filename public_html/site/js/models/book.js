var app = app || {};

app.Book = Backbone.Model.extend({

    defaults: {
        coverImage: 'img/sencha1.jpg',
        title: '無題',
        author: '不明',
        releaseDate: '不明',
        keywords: 'なし'
    },

    parse: function(response) {
        response.id = response._id;
        return response;
    }

});

