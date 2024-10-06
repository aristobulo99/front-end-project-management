import { Route } from "@angular/router";

export interface NavigationRoute{
    pathName: string
    icon: string,
    select: boolean,
    route: Route
}