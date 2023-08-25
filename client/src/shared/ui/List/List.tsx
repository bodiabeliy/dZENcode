import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dropdown } from 'react-bootstrap';
import Order, { ColumnsProps } from 'app/providers/storeProvider/types';
import cls from "./List.module.scss"
import { ActionButton } from '../ActionButton';
import { Modal } from '../Modal/Modal';
import { RemovePopup } from 'widgets/RemovePopup/ui/RemovePopup';
import { useState } from 'react';
interface ListProps {
    columns:ColumnsProps[]
    order?:Order
}

export const List =({columns, order}:ListProps) => {

  const [iszModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [remove, setRemove] = useState<Order>(null)



    const RemoveOrder =(orderObject:Order) => {
      setIsModalOpen(true)
      setRemove(orderObject)
      
    }
    const CloseModal = () => {
      setIsModalOpen(false)
    }

  return (
   <>
    <Modal isOpen={iszModalOpen} onClose={() => CloseModal()} children={<RemovePopup order={remove} />} />
    <Container className={cls.ItemRow}>
      {columns.map((column, indx) => {
        console.log("children", columns[order.id]);
          return (
              
          <Col md={columns[indx].MdSize}>
            {
              indx ==0 ? order.title
              : indx ==1 ?  order.products.length
              : indx ==2 ?  order.date
              : indx ==3 ?  "price"
              :
            <ActionButton onClick={() =>RemoveOrder(order) } />
            }
          </Col>
          )
      })}
      
    </Container>
   </>
  );
}

export default List;