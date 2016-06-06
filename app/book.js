var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = {
  fetchAllBookings: function(req, res, next) {
      connection.query("SELECT * FROM Bookings",[], function(err, rows){
          if (err) {
            return err;
          } else {
            req.users = rows;
            return next();
          }
      });
  }
}
