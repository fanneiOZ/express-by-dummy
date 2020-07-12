import {testRoutes} from "./app/api/test/routes";
import {ExpressListener} from "./libs/server/listeners/express-listener";
import {HttpServer} from './libs/server/http-server';

const httpPort = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 80
const listener = new ExpressListener(httpPort).addRoutes(testRoutes)

const server = HttpServer.create(listener)

server.start()
