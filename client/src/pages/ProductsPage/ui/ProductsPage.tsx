import { OrdersSelector } from 'app/providers/storeProvider/reducers/OrderSlice';
import { UserIsAuthSelector } from 'app/providers/storeProvider/reducers/UserSlice';
import Order, { ColumnsProps, Product, ProductPrice } from 'app/providers/storeProvider/types';
import React, { useEffect } from 'react';
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from "./ProductsPage.module.scss"
import { ProductsSelector, getOProducts } from 'app/providers/storeProvider/reducers/ProductSlice';
import { DropDirection } from 'react-bootstrap/esm/DropdownContext';
import { Products } from 'widgets/Products';
import { ActionButton } from 'shared/ui/ActionButton';
import AddButton from "shared/assets/icons/AddButton.svg"


const columns:ColumnsProps[] =[
    {
        name:"orderTitle",
        index:1,
        MdSize:4,
        textAlign:"left"
    }
]
const ProductPage = () => {
    const {t} = useTranslation("products");
    const dispatch = useDispatch()
    const products = useSelector(ProductsSelector)
    const Authorization = useSelector(UserIsAuthSelector)
    useEffect(() => {
        if (Authorization) {
            //@ts-ignore
            dispatch(getOProducts())
        }
           
    }, [Authorization])
    return (
        <div>
            {Authorization == true?
            <div className={classNames(cls.pageWrapper, {}, ["products"])}>
             <div className={cls.productTitle}>
                <ActionButton isBorder={true} iconImage={<AddButton />} onClick={() =>{} } />
                <h1>{t("pageTitle", { dataCount: products.length })}</h1>
            </div>
            {products.map((_:any, index) => (
                ['end'].map(
                    (direction:DropDirection) => (
                        <Products products={products} direction={direction} columns={columns} index={index} />
                    ),
                )
            ))}
            </div>
            :
            <div>
                 {t('pageTitleNotAuthorized')}
            </div>
            }
        </div>
    );
};

export default ProductPage;
