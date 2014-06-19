var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3030);

function handler (req, res) {
  var url = req.url;
  var file = __dirname;

  if (url === '/' || url === '/index.html') {
    file += '/app/index.html';
  }
  else if (url === '/socket.io.js') {
    file += '/app/socket.io.js';
  }
  else {
    file += '/app/favicon.ico';
  }

  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading ' + url);
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
