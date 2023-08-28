import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useTranslation} from "react-i18next";
import { UserIsAuthSelector } from 'app/providers/storeProvider/reducers/UserSlice';
import { OrdersSelector, getOrders } from 'app/providers/storeProvider/reducers/OrderSlice';
import Order, { ColumnsProps } from 'app/providers/storeProvider/types';

import {Orders} from "widgets/Orders"

import { classNames } from 'shared/lib/classNames/classNames';
import cls from "./OrdersPage.module.scss"
import { DropDirection } from 'react-bootstrap/esm/DropdownContext';




const columns:ColumnsProps[] =[
    {
        name:"orderTitle",
        index:1,
        MdSize:4,
        textAlign:"left"
    },
    {
        name:"orderProductsCount",
        index:2,
        MdSize:2,
        textAlign:"center",
        cellAlign:"baseline"
    },
    {
        name:"orderDate",
        index:3,
        MdSize:3,
        textAlign:"center"
    },
    {
        name:"orderPrice",
        index:4,
        MdSize:2,
        textAlign:"center"
    },
    {
        name:"orderActions",
        index:5,
        MdSize:1,
        textAlign:"center"
    },
]
const AboutPage = () => {
    const {t} = useTranslation("orders");
    const dispatch = useDispatch()
    const orders = useSelector(OrdersSelector)
    const Authorization = useSelector(UserIsAuthSelector)


    useEffect(() => {
        if (Authorization) {
            //@ts-ignore
            dispatch(getOrders())
        }
           
    }, [Authorization])

    

    return (
        Authorization ?
        <div>
            <div className={classNames(cls.pageWrapper, {}, ["orders"])}>
            {orders.map((order:Order, index) => (
                ['end'].map(
                    (direction:DropDirection) => (
                        <Orders order={order} orders={orders} direction={direction} columns={columns} index={index} />
                        
                    ),
                )
            ))}
            </div>
        </div>:null
    );
};

export default AboutPage;
