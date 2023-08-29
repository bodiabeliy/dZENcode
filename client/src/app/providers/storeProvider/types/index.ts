export default interface Order {
  id:number;
  title:string;
  date:string;
  description:string;
  products:Product[];
  totalSum:number
}

export interface Product {
  id:number;
  isAvialable:number;
  tiserialnumbertle:number;
  photo:string;
  title:string;
  type:string;
  specification:string;
  guarantee:DatePeriod;
  price:ProductPrice;
  date:string;
}

interface DatePeriod {
 start:string;
 end:string;
}

export interface ProductPrice {
  value:number;
  symbol:string;
  isDefault:number
}
 


export interface ColumnsProps {
  name:string;
  index:number;
  MdSize:any;
  textAlign?:any;
  cellAlign?:any

}