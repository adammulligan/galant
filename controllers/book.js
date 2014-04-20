request = require('request');
path    = require('path');

exports.new = function(req, res) {
  res.render('books/new', {title: 'Add book'});
};

var stringToArray = function(commaSeparatedString) {
  if (commaSeparatedString === undefined) {
    return undefined;
  }

  var splitString = commaSeparatedString.split(',');
  return splitString.map(function(s){return s.trim();});
};

exports.create = function(req, res) {
  console.log(req.body);
  var title   = req.body.title,
      genre   = stringToArray(req.body.genre),
      authors = stringToArray(req.body.authors);

  var body = {
    title: title,
    genre: genre,
    authors: authors
  };

  request({
    method: 'POST',
    url: 'http://localhost:5984/books_development',
    json: body
  }, function(err, response, body) {
    if (err) {
      res.status(500);
      return res.render('500');
    }

    res.render('books/new');
  });
};

exports.show = function(req, res) {
  bookUrl = res.locals.secrets.db.views.books.all + '?key="'+req.params.id+'"';

  request(bookUrl, function(err, response, body) {
    book = JSON.parse(body).rows[0];

    if (book === undefined) {
      res.status(404);
      return res.render('404');
    }

    bookDir = res.locals.secrets.bookDir;
    bookPath = path.join(bookDir, book.value.filename);

    res.set({"Content-Disposition": 'attachment; filename="'+book.value.filename+'"'});
    res.sendfile(bookPath);
  });
}
