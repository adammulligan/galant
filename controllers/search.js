exports.index = function(req, res) {
  var ElasticSearchClient = require('elasticsearchclient'),
      elasticSearchClient = new ElasticSearchClient(res.locals.secrets.elasticsearch);

  var query = {
    size: 500,
    query: {
      query_string: {
        query: "*"+req.query.query+"*",
        fields: ["name", "category"]
      }
    }
  };

  elasticSearchClient.search('books', 'book', query, function(err, data) {
    bodyJSON = JSON.parse(data);
    books = _.map(bodyJSON.hits.hits, function(row) { return row._source; });

    res.render('home', {
      title: 'Home',
      books: books
    });
  });
};
