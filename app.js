var render = require('./lib/render');
var route = require('koa-route');
var serve = require('koa-static-folder');
var koa = require('koa');
var app = koa();

app.use(serve('./public'));

app.use(route.get('/', main));

function *main() {
  this.body = yield render('index');
}

app.listen(3000);
console.log('listening on port 3000');