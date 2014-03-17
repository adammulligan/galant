request = require('request');
_ = require('underscore');

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  booksUrl = "http://localhost:5984/books/_design/books/_view/all";
  request(booksUrl, function (err, response, body) {
    bodyJSON = JSON.parse(body);
    books = _.map(bodyJSON.rows, function(row) { return row.value; });

    res.render('home', {
      title: 'Home',
      books: books
    });
  });
};
