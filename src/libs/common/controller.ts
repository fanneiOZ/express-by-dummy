import {Request, Response} from 'express'

export abstract class Controller {
    protected request: Request
    protected responseBody: unknown
    private headers: Map<string, string>

    protected setHeader(key: string, value: string): void {
        if (!this.headers) {
            this.headers = new Map()
        }

        this.headers.set(key, value)
    }
    handle<T extends Request, K extends Response>(req: T, res: K): void {
        this.handleRequest()
        if (!this.headers) {
            for (const [key, value] of this.headers.entries()) {
                res.setHeader(key, value)
            }
        }

        res.send(this.responseBody ?? undefined)
    }

    abstract handleRequest(): void
}