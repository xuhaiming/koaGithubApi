var render = require('./lib/render');
var route = require('koa-route');
var serve = require('koa-static-folder');
var koa = require('koa');
var app = koa();

var config = require('./config');
var githubOAuth = require('github-oauth')(config);

app.use(serve('./public'));

app.use(route.get('/', main));

app.use(route.get('/login', function *() {
  githubOAuth.login(this.request, this.response);
}));

app.use(route.get('/callback', function *() {
  githubOAuth.callback(this.request, this.response);
}));

githubOAuth.on('token', function(token, serverResponse) {
  console.log('here is your shiny new github oauth token', token);
  serverResponse.end(JSON.stringify(token))
});

function *main() {
  this.body = yield render('index');
}

app.listen(3000);
console.log('listening on port 3000');





