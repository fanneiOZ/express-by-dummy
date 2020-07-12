import {Controller} from "../../../libs/common/controller";

export class TestController extends Controller {
    handleRequest(): void {
        this.setHeader('content-type', 'application/json')
        this.responseBody = {a: 'hi'}
    }
}
