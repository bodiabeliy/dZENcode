import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dropdown } from 'react-bootstrap';
import Order, { ColumnsProps } from 'app/providers/storeProvider/types';
import cls from "./List.module.scss"
import { ActionButton } from '../ActionButton';
import { Modal } from '../Modal/Modal';
import { RemovePopup } from 'widgets/RemovePopup/ui/RemovePopup';
import { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { DateTimeFormmater } from 'shared/lib/dateFormater/dateFormater';
import TrashIcon from 'shared/assets/icons/trash.svg';



interface ListProps {
  pageName:string;
  columns:ColumnsProps[]
  dataItem?:any
}

export const List =({pageName, columns, dataItem}:ListProps) => {
  const { t, i18n } = useTranslation("orders");
  const [iszModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [remove, setRemove] = useState<Order>(null)
  const [monthByMonths, setMonthByMonths] = useState("")
  const [fullDate, setFulldate] = useState("")


  useEffect(() => {
    setMonthByMonths(DateTimeFormmater(dataItem.date).monthByMonths)
  }, [monthByMonths])

  useEffect(() => {
    setFulldate(DateTimeFormmater(dataItem.date).transformedDate)
  }, [fullDate])


    const RemoveOrder =(orderObject:Order) => {
      setIsModalOpen(true)
      setRemove(orderObject)
      
    }
    const CloseModal = () => {
      setIsModalOpen(false)
    }

    

  return (
   <>
    <Modal  type="action" isOpen={iszModalOpen} onClose={() => CloseModal()} children={<RemovePopup pageName={pageName} removeItem={remove} />} />
    <Container className={cls.ItemRow}>
    {
      pageName =="orders"?
      
        columns.length && columns.map((column, indx) => {
          return (
              
          <Col md={columns[indx].MdSize} style={{textAlign:column.textAlign, alignSelf:indx ==1?column.cellAlign:""}}>
            {
              indx ==0 ? 
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                {dataItem?.title}
              </div>
              : indx ==1 ? 
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                <div className="">
                  {dataItem?.products?.length}
                </div>
                <sub>{t("productsCount")}</sub>
              </div> 
              : indx ==2 ?  
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                <sub>{monthByMonths}</sub>
                <div className="span">
                  {fullDate}
                </div>
              </div> 
              : indx ==3 ? 
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                <sub>{dataItem.totalSum +" $"}</sub>
                <div className="span">
                  {dataItem.totalSum * 36 +" UAH"}
                </div>
                  
              </div> 
              :
            <ActionButton isBorder={false} iconImage={<TrashIcon />} onClick={() =>RemoveOrder(dataItem) } />
            } 
          </Col>
          )
      })
      :pageName =="products"?
        columns.length && columns.map((column, indx) => {
          return (
              
          <Col md={columns[indx].MdSize} style={{textAlign:column.textAlign, alignSelf:indx ==1?column.cellAlign:""}}>
            {
              indx ==0 ? 
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                {dataItem?.title}
              </div>
              : indx ==1 ? 
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                <div className="">
                  {dataItem?.type}
                </div>
              </div> 
              : indx ==2 ?  
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                <sub>{monthByMonths}</sub>
                <div className="span">
                  {fullDate}
                </div>
              </div> 
              : indx ==3 ? 
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                <div className="span">
                  {dataItem?.price?.value + " $"}
                </div>
              </div> 
              :
            <ActionButton isBorder={false} iconImage={<TrashIcon />} onClick={() =>RemoveOrder(dataItem) } />
            } 
          </Col>
          )
      })
      :
      null
    }

      
    </Container>
   </>
  );
}

export default List;