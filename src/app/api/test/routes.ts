import {Route} from "../../../libs/common/route";
import {TestController} from "./test.controller";

export const testRoutes: Route[] = [
    Route.create('get', '/').setHandler(TestController)
]

