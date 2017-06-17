// import http module
var http = require('http');

// file system
var fs = require('fs');

// create a new server instance
var server = http.createServer();

var re = /^\/currencies\/(\w+)/

var currencies = {
  'CAD': 1.3,
  'GBP': 0.78,
  'USD': 1
}

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
    var value = currencies[match[1]];
    res.write(`the value is ${value}`);
    res.end();
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
