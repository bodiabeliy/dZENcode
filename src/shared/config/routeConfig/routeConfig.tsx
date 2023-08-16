import {RouteProps} from "react-router-dom";
import {MainPage} from "pages/MainPage";
import {OrderPage} from "pages/OrdersPage";
import {ProdutcsPage} from "pages/ProductsPage";


export enum AppRoutes {
    MAIN = 'main',
    ORDERS = 'orders',
    PRODUCTS = 'products',

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ORDERS]: '/orders',
    [AppRoutes.PRODUCTS]: '/products'

}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.ORDERS]: {
        path: RoutePath.orders,
        element: <OrderPage />
    },
    [AppRoutes.PRODUCTS]: {
        path: RoutePath.products,
        element: <ProdutcsPage />
    },
}
