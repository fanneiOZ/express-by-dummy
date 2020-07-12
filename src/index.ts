import {testRoutes} from "./app/api/test/routes";
import {ExpressListener} from "./libs/server/listeners/express-listener";
import {HttpServer} from './libs/server/http-server';

const listener = new ExpressListener(80)
    .addRoutes(testRoutes)

const server = HttpServer.create(listener)

server.start()
