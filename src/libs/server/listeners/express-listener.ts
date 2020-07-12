import {Express} from "express";
import express = require('express')
import {Route} from "../../common/route";
import {AbstractListener} from "./abstract-listener";

export class ExpressListener extends AbstractListener<Express> {
    constructor(port: number) {
        super(port)
        this.setInstance(express())
    }

    addRoutes(routes: Route[]): this {
        routes.forEach(route => {
            this.app[route.method](
                route.path,
                (req, res) => route.getHandler().handle(req, res)
            )
        })

        return this
    }
}