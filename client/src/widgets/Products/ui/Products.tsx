import { ColumnsProps } from "app/providers/storeProvider/types";
import { Dropdown, SplitButton } from "react-bootstrap";
import { DropDirection } from "react-bootstrap/esm/DropdownContext";
import ProductList from "shared/ui/List/List";


interface IProps {
    products:any[];
    direction:DropDirection;
    columns:ColumnsProps[];
    index:number;
}
export const Products = ( {products, direction, columns, index}:IProps) => {
    return ( 
        <SplitButton
            className={"productList"}
            autoClose="inside"
            key={direction}
            id={`dropdown-button-drop-${direction}`}
            drop={direction}
            variant="secondary"
            title={
                <ProductList columns={columns}  dataItem={products[index]} />
            }
        >
        
        </SplitButton>
     );
}
 
