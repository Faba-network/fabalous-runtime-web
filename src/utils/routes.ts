import {IRoutes} from "../routes/IRoutes";
import {parseRoute} from "../routes/handleRoutes";
import FabaRuntimeWeb from "../FabaRuntimeWeb";

export const navigateTo = (route: IRoutes, options?: any) => {
    const path = parseRoute(route, options);
    const strPt = `${path}`;
    FabaRuntimeWeb.history.push(strPt);
};