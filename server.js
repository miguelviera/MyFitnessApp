var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , sql  = require('sqlite3')
  , port = 8080
  , debug = true


// db setup
var db = new sql.Database('workout.sqlite', (err) =>{
    if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)
  
  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'public/index.html')
      break
    case '/index.html':
      sendFile(res, 'public/index.html')
      break
    case '/workout.html':
      sendFile(res, 'public/workout.html')
      break
    case '/css/style.css':
      sendFile(res, 'css/style.css')
      break
    case '/css/style2.css':
      sendFile(res, 'css/style2.css')
      break
    case '/js/scripts.js':
      sendFile(res, 'js/scripts.js')
      break
    case '/js/scripts2.js':
      sendFile(res, 'js/scripts2.js')
      break
    case '/create':
      create(res, req)
      break
    case '/read':
      read(res)
      break
    case '/update':
      update(res, req)
      break
    case '/del':
      del(res, req)
      break
    default:
      res.end('404 not found')
  }
})


server.listen(process.env.PORT || port);
console.log('listening on 8080')

function sendFile(res, filename) {

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end(content, 'utf-8')
  })

}

// common technique for a 'unique' alphanumeric id 
function new_id() {
  return Date.now().toString(36)
}

// read all data from database and send to res
function read(res) {
  var workout = []
  db.each(
    "SELECT id, exercise, sets, reps FROM workout",  // database query
    function(err, row) { 
        if (err){
            throw err
        }
        console.log(row)
        workout.push(row) }, // called for each row returned
    function() { res.end( JSON.stringify(workout) ) } // called last
  )
}

// update specific line in database, using info in req, the request from the client
function update(res, req) {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    process( JSON.parse(body) )
    res.end()
  })
    
  function process( row ) {
      
    if(debug) console.log(row)
    var query = `
      UPDATE workout 
      SET exercise  = '${row.exercise}',
          sets = ${row.sets}, 
          reps = ${row.reps}
      WHERE
          id = '${row.id}'
    `
    if(debug) console.log(query)
    db.run( 
      query,
      function(err) { res.end('workout updated') }
    )
  }
}

// Add new row to database, using info in req, the request from the client
function create(res, req) {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    process( JSON.parse(body) )
    res.end()
  })
    
  function process( row ) {
      row.id = new_id()
      
    if(debug) console.log(row)
    var query = `
      INSERT INTO workout
        ('id', 'exercise', 'sets', 'reps')
        VALUES
      ('${row.id}', 
       '${row.exercise}', 
        ${row.sets},
        ${row.reps})
    `
    if(debug) console.log(query)
    db.run( 
      query,
      function(err) { res.end('workout inserted') }
    )
  }
}

// Delete specific line from database, using info in req, the request from the client
function del(res, req) {
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    process( JSON.parse(body) )
    res.end()
  })
    
  function process( row ) {
      
    if(debug) console.log(row)
    var query = `
      DELETE FROM workout
        WHERE id = '${row.id}'
    `
    if(debug) console.log(query)
    db.run( 
      query,
      function(err) { res.end('workout deleted') }
    )
  }
}