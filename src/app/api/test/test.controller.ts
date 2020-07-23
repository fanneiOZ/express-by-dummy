import { injectable } from "tsyringe";
import { TestSingletonCache } from "../../../cores/caching/test-singleton-cache";
import { Controller } from "../../../libs/common/controller";
import { ContentType } from "../../../libs/common/decorators/content-type.decorator";
import { DI } from "../../../libs/common/decorators/di-decorator";
import { ResponseStatus } from "../../../libs/common/decorators/response-status.decorator";

@DI
@injectable()
export class TestController extends Controller {
  constructor(protected cache: TestSingletonCache) {
    super();
  }

  @ResponseStatus(300)
  @ContentType("application/json")
  protected async handleRequest(): Promise<void> {
    this.cache.increase();

    this.resBody = { a: "hi", called: this.cache.calledTime };
  }
}
