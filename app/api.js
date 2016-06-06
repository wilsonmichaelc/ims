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
    connection.query("SELECT id, name, email, admin, locked, created FROM Users", function(err, rows){
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
    connection.query("SELECT id, name, email, admin, locked, created FROM Users WHERE id = ? ",[id], function(err, rows){
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
  app.put('/api/users/update', function(req, res) {
    if(req.body.id == req.user.id || middleware.isAdmin){
      connection.query("UPDATE Users SET name = ?, email = ?, admin = ?, locked = ? WHERE id = ?",[req.body.name, req.body.email, req.body.admin, req.body.locked, req.body.id], function(err, rows){
        if(err){
          res.json({"Error" : true, "Message" : "Error executing MySQL query" + err});
        }else{
          res.json({"Error" : false, "Message" : "Profile updated successfully"});
        }
      });
    }else{
      res.json({"Error" : true, "Message" : "Only admins can update other users profiles."});
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

  // =====================================
  // GET ALL THE BOOKINGS ================
  // =====================================
  app.get('/api/bookings', function(req, res) {
    connection.query("SELECT Bookings.id, Bookings.title, Bookings.start, Bookings.end, Users.name AS user, Instruments.name AS instrument FROM Bookings INNER JOIN Users ON Users.id = Bookings.user INNER JOIN Instruments ON Instruments.id = Bookings.instrument", [], function(err, rows) {
      if(!err && rows.length){
        for(var i=0; i<rows.length; i++){
          if(rows[i].title == ''){
            rows[i].title = rows[i].instrument;
          }
          console.log(rows[i].start);
          console.log(String(rows[i].start));
          rows[i].start = String(rows[i].start);
          rows[i].end = String(rows[i].end);
        }
        res.send(rows);
      }
    });
  });

};
