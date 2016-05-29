var config = require('./config');
var githubOAuth = require('github-oauth')(config);

require('http').createServer(function(req, res) {
  if (req.url.match(/login/)) return githubOAuth.login(req, res);
  if (req.url.match(/callback/)) return githubOAuth.callback(req, res)
}).listen(3000);

githubOAuth.on('error', function(err) {
  console.error('there was a login error', err)
});

githubOAuth.on('token', function(token, serverResponse) {
  console.log('here is your shiny new github oauth token', token, serverResponse);
  serverResponse.end(JSON.stringify(token))
});
