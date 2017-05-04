var http = require('http');
var httpProxy = require('http-proxy');

var proxy = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 80
  }
})

function errorHandler(res) {
  try {
    res.status(504);
    res.write('<script type="text/javascript">setTimeout(function(){location.reload();},1000)</script>');
    res.end();
  } catch (e) {
  }
}

var server = http.createServer(function(req, res) {
  if(req.url.indexOf('/dxapps') === 0) {
    proxy.web(req, res,
      {target: 'http://localhost', ws: true},
      function() { return errorHandler(res); }
    );
  } else {
    proxy.web(req, res,
      {target: 'http://localhost/dxapps/devexpress/infopanel', ws: true},
      function() { return errorHandler(res); }
    );
  }
})

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
})

server.listen(8080, "0.0.0.0")
