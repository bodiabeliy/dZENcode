import Order, { ColumnsProps } from "app/providers/storeProvider/types";
import { Dropdown, SplitButton } from "react-bootstrap";
import { DropDirection } from "react-bootstrap/esm/DropdownContext";
import OrderList from "shared/ui/List/List";


interface ProductProps {
    order:Order;
    orders:Order[];
    direction:DropDirection;
    columns:ColumnsProps[];
    index:number;
}
export const Orders = ({order, orders, direction, columns, index}:ProductProps) => {
    return ( 
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
     );
}
 
