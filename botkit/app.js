var http = require('http');
var fs = require('fs')

var port =Number(process.env.PORT || 5000)
http.createServer(function(req, res) {
  switch (req.url) {
    case '/':
    case '/advisor_bot.js': {
      res.writeHead(200, { 'Content-Type': 'text/javascript'});
      res.end(fs.readFileSync('examples/advisor_bot.js', 'utf8'));
      break;
    }
    default: {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 not found');
      break;
    }
}
}).listen(port);

console.log('Server running at http://127.0.0.1: /'+port);