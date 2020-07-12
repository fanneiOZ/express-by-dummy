import {Controller} from "../../../libs/common/controller";
import {ContentType} from "../../../libs/common/decorators/content-type.decorator";

export class TestController extends Controller {

    @ContentType('application/json')
    protected handleRequest(): void {
        this.resBody = {a: 'hi'}
    }
}
