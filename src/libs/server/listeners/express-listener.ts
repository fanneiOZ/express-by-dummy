import { Express } from "express";
import * as express from "express";
import { Route } from "../../common/route";
import { AbstractListener } from "./abstract-listener";

export class ExpressListener extends AbstractListener<Express> {
  constructor(port: number) {
    super(port);
    this.setInstance(express());
    this.getInstance().use(express.json());
    this.getInstance().use(express.urlencoded({ extended: true }));
  }

  addRoutes(routes: Route[]): this {
    routes.forEach((route) => {
      this.app[route.method](route.path, (req, res, next) =>
        route.getHandler().handle(req, res, next)
      );
    });

    return this;
  }
}
