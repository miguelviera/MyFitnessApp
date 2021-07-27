var sql = require('sqlite3');

// create database
var db = new sql.Database('workout.sqlite');

db.serialize(function() {

  // making the table
  db.run("CREATE TABLE workout (id varchar(100), exercise varchar(100), sets integer, reps integer)");

  // adding data
  db.run("INSERT INTO workout VALUES ('asdf123', 'Bench Press', 4, 4)");
  db.run("INSERT INTO workout VALUES ('jkl321', 'Dumbell Fly', 4, 6)");
  db.run("INSERT INTO workout VALUES ('randomExample', 'Pec Raise', 3, 10)");

  // verify we can query data
  db.each("SELECT id, exercise, sets, reps FROM workout", function(err, row) {
      console.log( JSON.stringify(row) );
  });

});

db.close();