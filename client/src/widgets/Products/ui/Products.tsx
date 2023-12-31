import { ColumnsProps, Product } from "app/providers/storeProvider/types";
import { DropdownButton } from "react-bootstrap";
import { DropDirection } from "react-bootstrap/esm/DropdownContext";
import ProductList from "shared/ui/List/List";


interface IProps {
    products:Product[];
    direction:DropDirection;
    columns:ColumnsProps[];
    index:number;
}
export const Products = ( {products, direction, columns, index}:IProps) => {
    return ( 
        <DropdownButton
            className={"productList"}
            autoClose="inside"
            key={direction}
            id={`dropdown-button-drop-${direction}`}
            variant="secondary"
            title={
                <ProductList pageName="products" columns={columns}  dataItem={products[index]} />
            }
        >
        
        </DropdownButton>
     );
}
 
