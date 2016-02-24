// app/api.js
var mysql = require('mysql');
var dbconfig = require('../config/database');
var middleware = require('./middleware');
var bcrypt = require('bcrypt');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(app, passport){

  // =====================================
  // GetUsers SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/api/users', middleware.isAdmin, function(req, res) {
    connection.query("SELECT id, name, email, admin, createdAt FROM Users", function(err, rows){
      if(err){
        return done(err);
      }else if(rows.length){
        res.send(JSON.stringify(rows));
      }
    });
  });

  // =====================================
  // GetUser SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/api/users/:user', middleware.isAdmin, function(req, res) {
    var id = req.params.user;
    connection.query("SELECT id, name, email, admin, createdAt FROM Users WHERE id = ? ",[id], function(err, rows){
      if(err){
        return done(err);
      }else if(rows.length){
        res.send(JSON.stringify(rows));
      }
    });

  });

  // =====================================
  // UpdateUser SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.put('/api/users', function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    if(id == req.user.id || middleware.isAdmin){
      connection.query("UPDATE Users SET name = ?, email = ? WHERE id = ?",[name, email, id], function(err, rows){
        if(err){
          res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        }else{
          res.json({"Error" : false, "Message" : "Profile updated successfully"});
        }
      });
    }else{
      res.json({"Error" : true, "Message" : "Only admins can update other profiles"});
    }
  });

  // =====================================
  // CHECK USER PASSWORD =================
  // =====================================
  app.post('/api/verify', function(req, res) {
    var id = req.body.id;
    var pass = req.body.password;
      if(id == req.user.id){
        connection.query("SELECT password FROM Users WHERE id = ?",[id], function(err, rows) {
          if(!err && rows.length){
            res.send(bcrypt.compareSync(pass, rows[0].password));
          }
        });
      }
  });

};
