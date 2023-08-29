import Order, { ColumnsProps, Product } from "app/providers/storeProvider/types";
import { useEffect, useState } from "react";
import { Dropdown, SplitButton } from "react-bootstrap";
import { DropDirection } from "react-bootstrap/esm/DropdownContext";
import { classNames } from "shared/lib/classNames/classNames";
import OrderList from "shared/ui/List/List";
import { OrderDetailze } from "widgets/OrderDetailze";

import cls from "./Orders.module.scss"
import { useDispatch } from "react-redux";
import { getOrderCurrentPrices } from "app/providers/storeProvider/reducers/OrderSlice";

interface IOrderIProps {
    order:any;
    orders:any[];
    direction:DropDirection;
    columns:ColumnsProps[];
    index:number;
}
export const Orders = ({order, orders, direction, columns, index}:IOrderIProps) => {
    const dispatch = useDispatch()

    const [isListCollapsed, setIslistCollapsed] = useState(false)

    const listCollapsed = () => {
        setIslistCollapsed(prev => !prev)
    };

   

   
    useEffect(() => {
        if (order.products.length && orders.length) {
            //@ts-ignore
            dispatch(getOrderCurrentPrices({order, orders}))
        }
    }, [])
    
    return ( 
        <SplitButton
            className={classNames("ordersList", {[cls.listCollapsed]: isListCollapsed})}
            autoClose="inside"
            key={direction}
            id={`dropdown-button-drop-${direction}`}
            drop={direction}
            variant="secondary"
            title={
                <OrderList columns={columns}  dataItem={orders[index]} />
            }
            onToggle={() => listCollapsed()}
        >
        
            <Dropdown.Item eventKey={1} >
                <OrderDetailze 
                    className={cls.orderDetalizeInfo__wrapper}
                    products={order.products} 
                    parentOrderTitle={order.title}
                />
            </Dropdown.Item>
        </SplitButton>
     );
}
 
