var http = require('http');
var server = http.createServer();

server.on('request', require('./app'));

server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
});