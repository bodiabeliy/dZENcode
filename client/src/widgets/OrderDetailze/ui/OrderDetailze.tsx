import { Product } from "app/providers/storeProvider/types";
import { ActionButton } from "shared/ui/ActionButton";
import {Image} from "shared/ui/Image/Image"

import { useTranslation } from "react-i18next";

import { classNames } from "shared/lib/classNames/classNames";
import cls from "./OrderDetailze.module.scss"
import AddButton from "shared/assets/icons/AddButton.svg"
import TrashIcon from "shared/assets/icons/trash.svg"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


interface OrderDetailzeProps {
    className:string
    products:Product[];
    parentOrderTitle:string;
}
export const OrderDetailze = ({products,className, parentOrderTitle}:OrderDetailzeProps) => {
    const {t} = useTranslation("orders")
    const [isAvialable, setIsAvialable] = useState<boolean>(false)
    const [status, setStatus] = useState<string>("")


    const setPoductStatus = () => {
        products.map((productItem:Product) => {

            if (productItem.isAvialable ==0) {
                setIsAvialable(false)
                setStatus(t("productNotAvialableStatus"))
            }
            else {
                setIsAvialable(true)
                setStatus(t("productAvialableStatus"))

            }
        })
    }

    useEffect(() => {
        setPoductStatus()
    }, [isAvialable, status])
    
    return ( 
       <>
       <div className={classNames(className)}>
        <h1>{parentOrderTitle}</h1>
        <div className={cls.actionListBtn}>
            <ActionButton isBorder={true} iconImage={<AddButton />} onClick={() => {}} />
            <span>{t("addNewProduct")}</span>
        </div>
        <div className={cls.orderDetalizeList}>
            {products.map((product:Product) => (
                <div className={cls.productByOrder}>
                    <div className={cls.productByOrder__fieldColumns}>
                        <div className={cls.productTitle}>
                            <Image className={cls.productPreview} image={product.photo} />
                            <div>
                                <p className={cls.productTitle__modelName}>{product.title}</p>
                                <span className={cls.productTitle__modelDescription}>{product.specification}</span>
                            </div>
                        </div>

                        <div className={classNames(cls.productType, {[cls.productAvialable]:isAvialable, [cls.productNotAvialable]:!isAvialable})}>
                            {status}
                        </div>
                        <ActionButton isBorder={false} iconImage={<TrashIcon />} onClick={() => {}} />
                    </div>
                </div>
            ))}
        </div>
       </div>
       </>
     );
}
 
