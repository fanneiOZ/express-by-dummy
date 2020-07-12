import {Request, Response} from 'express'
import {HttpException} from "./http-exception";

export abstract class Controller {
    protected resBody: unknown
    protected params: Map<string, string>
    private headers: Map<string, string>
    private status: number = 200

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

        this.params = new Map<string, string>()
        Object.entries(req.params).forEach(([key, value]) => {
            this.params.set(key, value)
        })

        try {
            this.handleRequest(req.body, req.query)

            for (const [key, value] of this.headers.entries()) {
                res.setHeader(key, value)
            }
            res.status(this.status)
        } catch (e) {
            const exception = e instanceof HttpException ? e
                : new HttpException(500, e.name, e.message).withCause(e)

            res.status(exception.errorCode)
            this.resBody = {error: exception.name, msg: e.message}
        } finally {
            res.send(this.resBody ?? undefined)
        }
    }

    protected setStatus(status: number): void {
        this.status = status
    }
    protected abstract handleRequest<T, K>(body?: T, query?: K): void
}