const server = require('./server');
const router = require('./router');
const rh = require('./handlerRequest');

let handle = {};

handle["/modificarPersona"] = rh.modificarPersona;
handle["/modificar"] = rh.modificar;
handle["/resultado"] = rh.resultado;

server.start(router.route, handle);