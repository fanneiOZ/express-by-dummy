import {Route} from "../../common/route";

export abstract class AbstractListener<T> {
    protected app: T;

    protected constructor(
        public readonly port: number
    ) {
    }

    protected setInstance(app: T): AbstractListener<T> {
        if (!this.app) {
            this.app = app
        }

        return this
    }

    getInstance(): T {
        return this.app
    }

    abstract addRoutes(routes: Route[]): AbstractListener<T>
}