request = require('request');
_ = require('underscore');

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  booksUrl = res.locals.secrets.db.views.books.all;
  request(booksUrl, function (err, response, body) {
    bodyJSON = JSON.parse(body);
    books = _.map(bodyJSON.rows, function(row) { return row.value; });

    res.render('home', {
      title: 'Home',
      books: books
    });
  });
};
