var express = require('express');
var app = express();
var session = require('express-session');
var config = require('./config');
var githubOAuth = require('github-oauth')(config);

app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 }
}));

app.get('/', function (req, res) {

  console.log(req.cookies);

  res.send('Hello World!');

});

app.get('/login', githubOAuth.login);
app.get('/callback', githubOAuth.callback);

githubOAuth.on('error', function(err) {
  console.error('there was a login error', err)
});

githubOAuth.on('token', function(token, resp, tokenResp, req) {
  var sess = req.session;

  sess.githubToken = token;

  resp.end(JSON.stringify(token));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
