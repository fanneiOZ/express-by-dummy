import {Request, Response} from 'express'

export abstract class Controller {
    protected resBody: unknown
    private headers: Map<string, string>

    protected setHeader(key: string, value: string): void {
        if (this.headers === undefined) {
            this.headers = new Map()
        }

        this.headers.set(key, value)
    }

    handle<T extends Request, K extends Response>(req: T, res: K): void {
        if (this.headers === undefined) {
            this.headers = new Map()
        }

        this.handleRequest()

        for (const [key, value] of this.headers.entries()) {
            res.setHeader(key, value)
        }

        res.send(this.resBody ?? undefined)
    }

    protected abstract handleRequest(): void
}