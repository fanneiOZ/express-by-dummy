import { Controller } from "./controller";
import { container } from "tsyringe";

export class Route {
  static create(method: "get" | "post", path: string): Route {
    return new Route(method, path);
  }
  protected handler: Controller;

  protected constructor(
    public readonly method: "get" | "post",
    public readonly path: string
  ) {}

  setHandler<T extends Controller>(
    controller: new (...args: any[]) => T
  ): Route {
    if (controller.prototype.hasOwnProperty("injected")) {
      this.handler = container.resolve(controller);
    } else {
      this.handler = new controller();
    }

    return this;
  }

  getHandler(): Controller {
    return this.handler;
  }
}
