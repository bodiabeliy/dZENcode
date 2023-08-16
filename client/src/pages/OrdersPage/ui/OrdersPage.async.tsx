import {lazy} from "react";

export const OrdersPageAsync = lazy(() => new Promise(resolve => {
    // @ts-ignore
    setTimeout(() => resolve(import('./OrdersPage')), 1500)
}));
