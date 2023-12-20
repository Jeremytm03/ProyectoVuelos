const dbConfig = {
    user: 'adminVuelos',
    password: 'Vuelo123',
    server: 'vuelo-server.database.windows.net',
    database: 'VueloDB',
    options: {
      encrypt: true,  
      enableArithAbort: true,
    },
  };
  
  module.exports = dbConfig;
  