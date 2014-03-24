module.exports = {
  db: {
    views: {
      books: {
        all: 'http://localhost:5984/books/_design/books/_view/all'
      }
    }
  },

  elasticsearch: {
    host: 'localhost',
    port: 9200,
    secure: false
  },

  bookDir: '/Users/adammulligan/cloud/Dropbox/eBooks',

  sessionSecret: "Your Session Secret goes here"
};
