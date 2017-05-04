var http = require('http');
var httpProxy = require('http-proxy');

var server = http.createServer(function(req, res) {
  if(req.path.indexOf('/dxapps') === 0) {
    httpProxy.createProxyServer().web(req, res, {target: 'http://localhost', ws: true}, function () {
      try {
        res.status(504);
        res.write('<script type="text/javascript">setTimeout(function(){location.reload();},1000)</script>');
        res.end();
      } catch (e) {
      }
    });
  } else {
    httpProxy.createProxyServer().web(req, res, {target: 'http://localhost/dxapps/devexpress/infopanel', ws: true}, function () {
      try {
        res.status(504);
        res.write('<script type="text/javascript">setTimeout(function(){location.reload();},1000)</script>');
        res.end();
      } catch (e) {
      }
    });
  }
})

server.listen(8080, "0.0.0.0")