import {IRoutes} from "./IRoutes";
import {FabaWebRoutes} from "./FabaWebRoutes";

export function parseRoute(route: IRoutes, args): string {
    const r = /(::)\w+/g;
    const splited = route.route.split("/");
    let path = "/";

    if (args) {
        splited.forEach(item => {
            const isVar: boolean = r.test(item);
            if (isVar) {
                const u = item.replace("::", "");
                if (args[u]) path += args[u] + "/";
            } else if (item !== "") {
                path += item + "/";
            }
        });
    } else {
        path = route.route;
    }

    return path;
}

export function mapUrlToRoute(url: string, wroutes: FabaWebRoutes): IRoutes {
    const pathItems = spliteUrl(url);
    const routes: IRoutes[] = wroutes.getRoutes();
    const actRoute: IRoutes | undefined = routes.find((item: IRoutes) => {
        const itemSp = spliteUrl(item.route);
        if (itemSp.length === pathItems.length) {
            return compare(pathItems, itemSp);
        }
        return false;
    });

    if (actRoute) {
        const t: IRoutes = actRoute;
        t.args = mapItems(pathItems, spliteUrl(actRoute.route));
        return t;
    }

    return wroutes.getRoutes()[0];
}

function spliteUrl(url: string) {
    const u = url.split("/");
    return u.filter(item => item !== "");
}

function compare(pathItems: string[], itemSp: string[]) {
    const filteredItem = itemSp.filter(item => item.indexOf("::") === -1);

    let matchCount = 0;
    itemSp.forEach((it, index) => {
        if (pathItems[index].indexOf("::") === -1 && pathItems[index] === it) {
            matchCount++;
        }
    });

    return (matchCount === filteredItem.length);
}

function mapItems(pathItems: string[], itemSp: string[]) {
    const args: any = {};
    itemSp.forEach((it, index) => {
        if (it.indexOf("::") !== -1) {
            const varName = it.replace("::", "");
            args[varName] = pathItems[index];
        }
    });

    return args;
}