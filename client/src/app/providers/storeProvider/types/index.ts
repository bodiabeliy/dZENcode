export default interface Order {
  id:number;
  title:String;
  date:String,
  description:String
  products:Product[]
}

interface Product {
  id:number;
  tiserialNumbertle:Number;
  photo:String;
  title:String;
  type:String;
  specification:String;
  guarantee:DatePeriod;
  price:ProductPrice[];
  date:String;
}

interface DatePeriod {
 start:String;
 end:String;
}

interface ProductPrice {
  value:Number;
  symbol:String;
  isDefault:Number
}
 


export interface ColumnsProps {
  name:String;
  index:any;
  MdSize:any;
}