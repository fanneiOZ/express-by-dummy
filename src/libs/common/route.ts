import {Controller} from "./controller";

export class Route {
    static create(method: 'get' | 'post', path: string): Route {
        return new Route(method, path)
    }
    protected handler: Controller

    protected constructor(
        public readonly method: 'get' | 'post',
        public readonly path: string,
    ) {}

    setHandler<T extends Controller>(controller: new() => T): Route {
        this.handler = new controller()

        return this
    }

    getHandler(): Controller {
        return this.handler
    }
}