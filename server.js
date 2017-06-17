// import http module
var http = require('http');

// file system
var fs = require('fs');

var csv = require('node-csv');

var querystring = require('querystring');

var parser = csv.createParser();

// create a new server instance
var server = http.createServer();

var re = /^\/currencies\/(\w+)/

// listening to some events: e.g. if open a new browser will return a client obj
// the server is an instance of eventemiter, meaning it has an on method for listening for events
server.on('request', function(req, res){

  // check && log errors
  req.on('error', function(err){
    console.error(err);
  });

  // check && log errors
  res.on('error', function(err){
    console.log(err);
  });

  // to see if url matches re
  var match = req.url.match(re);

  if (match) {
    console.log(match);
    parser.mapFile('rate.csv', function(err, rows){
      var value = rows.find(function(row){
        return row.currency === match[1];
      });

      var q = res.url.split('?')[1];

      if(q){
        var amount = querystring.parse(q);
        console.log(amount);
        parseFloat(amount.value) * value.value;
      }

      if(value){
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(value), 'utf-8');
        res.end();
        // var output = {
        //   currency:
        // }
        // res.write(output);
        // res.end();
      }
      else{
        res.statusCode = 400;
        res.write('Not a valid input');
        res.end();
      }

    });

  }
  else {
    // read file system to find index.html - write to response with the contents
    fs.readFile('index.html', function(err, contents){
      if (req.url === '/home'){
        res.write(contents);
        res.end();
      }
      else {
        res.statusCode = 404;
        res.write('404 not found');
        res.end();
      }
    });
  }



});


// listening to port 8080 - with a cb to do something
server.listen(8080, function(){
  console.log('listening 8080...');
});

// install nodemon to watch
