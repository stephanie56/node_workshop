// import http module
var http = require('http');

// file system
var fs = require('fs');

// create a new server instance
var server = http.createServer();

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

  // read file system to find index.html - write to response with the contents
  fs.readFile('index.html', function(err, contents){
    if (req.url === '/home'){
      res.write(contents);
      res.end();
    }
    else {
      res.write('404 not found');
      res.end();
    }
  });

});


// listening to port 8080 - with a cb to do something
server.listen(8080, function(){
  console.log('listening 8080...');
});

// install nodemon to watch
