import Order, { ColumnsProps } from "app/providers/storeProvider/types";
import { Dropdown, SplitButton } from "react-bootstrap";
import { DropDirection } from "react-bootstrap/esm/DropdownContext";
import OrderList from "shared/ui/List/List";


interface ProductProps {
   
}
export const Products = ({order, orders, direction, columns, index}:any) => {
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
        
        </SplitButton>
     );
}
 
