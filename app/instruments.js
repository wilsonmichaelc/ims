var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = {
  fetchUserInstruments: function(req, res, next) {
      connection.query("SELECT id, name, offline from Instruments INNER JOIN InstrumentAccess ON InstrumentAccess.instrument = Instruments.id AND InstrumentAccess.user = ? WHERE offline = 0",[req.user.id], function(err, rows){
          if (err) {
            return err;
          } else {
            req.instruments = rows;
            return next();
          }
      });
  }
}
