import { injectable } from "tsyringe";
import { TestSingletonCache } from "../../../cores/caching/test-singleton-cache";
import {Product} from "../../../cores/sandbox/models/product";
import {ProductRepository} from "../../../cores/sandbox/repositories/product-repository";
import { Controller } from "../../../libs/common/controller";
import { ContentType } from "../../../libs/common/decorators/content-type.decorator";
import { DI } from "../../../libs/common/decorators/di-decorator";
import { ResponseStatus } from "../../../libs/common/decorators/response-status.decorator";

@DI
@injectable()
export class TestController extends Controller {
  constructor(
      protected cache: TestSingletonCache,
      protected repo: ProductRepository,
  ) {
    super()
  }

  @ResponseStatus(300)
  @ContentType("application/json")
  protected async handleRequest(): Promise<void> {
    this.cache.increase()
    await this.repo.createRepository()

    const product = new Product({key: 'a123', name: 'a'})

    try {
      await this.repo.create(product)
    } catch (e) {
      console.log(e)
    }

    this.resBody = { a: "hi", called: this.cache.calledTime }
  }
}
