import { OrdersSelector } from 'app/providers/storeProvider/reducers/OrderSlice';
import { UserIsAuthSelector } from 'app/providers/storeProvider/reducers/UserSlice';
import Order from 'app/providers/storeProvider/types';
import React, { useEffect } from 'react';
import {useTranslation} from "react-i18next";
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from "./ProductsPage.module.scss"


const AboutPage = () => {
    const {t} = useTranslation("products");
    const orders = useSelector(OrdersSelector)
    const Authorization = useSelector(UserIsAuthSelector)
    useEffect(() => {
        if (Authorization) {
            //@ts-ignore
            dispatch(getOrders())
        }
           
    }, [Authorization])
    return (
        <div>
            <div className={classNames(cls.pageWrapper, {}, ["products"])}>
            {t('pageTitle')}
            {orders.map((order:Order) => {
                return (
                    <p>{order.title}</p>
                )}
            )}
            </div>
        </div>
    );
};

export default AboutPage;
