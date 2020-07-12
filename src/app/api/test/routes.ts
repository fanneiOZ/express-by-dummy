import {Route} from "../../../libs/common/route";
import {TestParamController} from "./test-param.controller";
import {TestController} from "./test.controller";

export const testRoutes: Route[] = [
    Route.create('get', '/').setHandler(TestController),
    Route.create('get', '/:word/:id').setHandler(TestParamController)
]
