const http = require('http');
const url = require('url');

function start(route, handle){
    function onRequest(req, res){
        const pathname = url.parse(req.url).pathname;
        console.log('Request para ruta '+pathname+' recibido');
        route(handle, pathname, req, res);
    }
    http.createServer(onRequest).listen(8888);
    console.log("servidor on");
}
exports.start = start;