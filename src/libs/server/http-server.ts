import { createServer, Server } from "http";
import { AbstractListener } from "./listeners/abstract-listener";

export class HttpServer {
  protected static instance: HttpServer;
  protected server: Server;

  private constructor(protected listener: AbstractListener<unknown>) {
    this.server = createServer(listener.getInstance());
  }

  static create<T>(listener: AbstractListener<T>): HttpServer {
    if (!listener) {
      return;
    }

    if (!this.instance) {
      this.instance = new HttpServer(listener);
    }

    return this.instance;
  }

  start(): void {
    this.server.listen(this.listener.port, () => {
      console.log(`Start listening on ${this.listener.port}`);
    });

    this.server.on("connection", () => {
      this.server.emit("close");
    });
  }
}
