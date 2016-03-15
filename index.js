var http = require('http');
var server = http.createServer();

var port = process.env.PORT || 3001;

server.on('request', require('./app'));

server.listen(port, function(){
  console.log("Express server listening on port " + port);
});