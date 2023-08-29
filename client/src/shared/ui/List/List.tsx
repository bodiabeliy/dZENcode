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
import { useSelector } from 'react-redux';
import { OrdersOrderCurrentPricesSelector } from 'app/providers/storeProvider/reducers/OrderSlice';


interface ListProps {
    columns:ColumnsProps[]
    order?:Order
}

export const List =({columns, order}:ListProps) => {
  const { t, i18n } = useTranslation("orders");
  const orderTotalPrice = useSelector(OrdersOrderCurrentPricesSelector)
  const [iszModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [remove, setRemove] = useState<Order>(null)
  const [monthByMonths, setMonthByMonths] = useState("")
  const [fullDate, setFulldate] = useState("")


  useEffect(() => {
    setMonthByMonths(DateTimeFormmater(order.date).monthByMonths)
  }, [monthByMonths])

  useEffect(() => {
    setFulldate(DateTimeFormmater(order.date).transformedDate)
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
    <Modal  type="action" isOpen={iszModalOpen} onClose={() => CloseModal()} children={<RemovePopup order={remove} />} />
    <Container className={cls.ItemRow}>
      {columns.map((column, indx) => {
          return (
              
          <Col md={columns[indx].MdSize} style={{textAlign:column.textAlign, alignSelf:indx ==1?column.cellAlign:""}}>
            {
              indx ==0 ? 
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                {order.title}
              </div>
              : indx ==1 ? 
              <div className={classNames(cls[`colunm-${indx}`], {}, [cls[column.name]])}>
                <div className="">
                  {order.products.length}
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
                <sub>{order.totalSum +" $"}</sub>
                <div className="span">
                  {order.totalSum * 36 +" UAH"}
                </div>
              </div> 
              :
            <ActionButton isBorder={false} iconImage={<TrashIcon />} onClick={() =>RemoveOrder(order) } />
            } 
          </Col>
          )
      })}
      
    </Container>
   </>
  );
}

export default List;