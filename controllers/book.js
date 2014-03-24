request = require('request');
path    = require('path');

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
