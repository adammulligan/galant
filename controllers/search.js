exports.index = function(req, res) {
  elasticSearchConfig = res.locals.secrets.elasticsearch;
  elasticSearchUrl = "http://"+elasticSearchConfig.host+":"+elasticSearchConfig.port+"/_search";

  var query = {
    size: 500,
    query: {
      query_string: {
        query: "*"+req.query.query+"*",
        fields: ["name", "category"]
      }
    }
  };

  request.post({
    url: elasticSearchUrl,
    body: query,
    json: true
  }, function (err, response, data) {
    books = _.map(data.hits.hits, function(row) { return row._source; });

    res.render('home', {
      title: 'Home',
      books: books
    });
  });
};
