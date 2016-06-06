var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = {
  fetchAllUsers: function(req, res, next) {
      connection.query("SELECT id, name, email, created FROM Users",[], function(err, rows){
          if (err) {
            return err;
          } else {
            req.users = rows;
            return next();
          }
      });
  }
}
