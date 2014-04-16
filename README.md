# Galant

A virtual bookshelf.

## Set up

### Search

Elastic Search is used to for indexing CouchDB and running searches.

Install the CouchDB ElasticSearch River plugin to have CouchDB records
automatically indexed:

```
cd <elastic search install directory>
./bin/plugin -install elasticsearch/elasticsearch-river-couchdb/1.2.0
```

Setup the CouchDB index in ElasticSearch:

```
curl -X PUT '127.0.0.1:9200/_river/books/_meta' -d '{ "type" : \
  "couchdb", "couchdb" : { "host" : "localhost", "port" : 5984, "db" : \
  "books", "filter" : null }, "index" : { "index" : "books", "type" : \
  "books", "bulk_size" : "100", "bulk_timeout" : "10ms" } }'
```
