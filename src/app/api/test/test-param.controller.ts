import {Controller} from "../../../libs/common/controller";
import {ContentType} from "../../../libs/common/decorators/content-type.decorator";

export class TestParamController extends Controller {
    @ContentType('application/json')
    protected handleRequest<T, K>(body: T, query: K): void {
        this.resBody = {
            id: this.params.get('id'),
            word: this.params.get('word'),
            body,
            query
        }

        throw new TypeError('TypeError from ts')
    }
}
