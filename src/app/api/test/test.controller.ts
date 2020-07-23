import {Controller} from "../../../libs/common/controller";
import {ContentType} from "../../../libs/common/decorators/content-type.decorator";
import {ResponseStatus} from "../../../libs/common/decorators/response-status.decorator";

export class TestController extends Controller {
    @ResponseStatus(300)
    @ContentType('application/json')
    protected async handleRequest(): Promise<void> {
        this.resBody = {a: 'hi'}
    }
}
