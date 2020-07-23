import { injectable } from "tsyringe";

@injectable()
export class TestSingletonCache {
  private mem: Map<string, unknown>;

  constructor() {
    this.mem = new Map<string, unknown>();

    this.mem.set("calledTime", 0);
  }

  increase(): void {
    const increased = (this.mem.get("calledTime") as number) + 1;

    this.mem.set("calledTime", increased);
  }

  decrease(): void {
    const decreased = (this.mem.get("calledTime") as number) - 1;

    this.mem.set("calledTime", decreased);
  }

  get calledTime(): number {
    return this.mem.get("calledTime") as number;
  }
}
