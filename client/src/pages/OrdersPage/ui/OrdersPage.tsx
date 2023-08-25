import React, { useEffect } from 'react';
import {useTranslation} from "react-i18next";
import { classNames } from 'shared/lib/classNames/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersSelector, getOrders } from 'app/providers/storeProvider/reducers/OrderSlice';
import Order, { ColumnsProps } from 'app/providers/storeProvider/types';
import { UserIsAuthSelector } from 'app/providers/storeProvider/reducers/UserSlice';

import cls from "./OrdersPage.module.scss"
import { Dropdown, SplitButton } from 'react-bootstrap';
import OrderList from "shared/ui/List/List";



const columns:ColumnsProps[] =[
    {
        name:"orderTitle",
        index:1,
        MdSize:4
    },
    {
        name:"orderProductsCount",
        index:2,
        MdSize:2
    },
    {
        name:"orderDate",
        index:3,
        MdSize:3
    },
    {
        name:"orderPrice",
        index:4,
        MdSize:2
    },
    {
        name:"orderActions",
        index:5,
        MdSize:1
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
                    (direction:any) => (
                        <SplitButton
                            className={""}
                            autoClose="inside"
                            key={direction}
                            id={`dropdown-button-drop-${direction}`}
                            drop={direction}
                            variant="secondary"
                            title={
                                <OrderList columns={columns}  order={orders[index]} />
                            }
                        >
                            
                        <Dropdown.Item eventKey={1}>
                            {order.products.map((product) => (
                                <>{product.title}</>
                            ))}
                        </Dropdown.Item>
                        </SplitButton>
                    ),
                )
            ))}
            </div>
        </div>:null
    );
};

export default AboutPage;
