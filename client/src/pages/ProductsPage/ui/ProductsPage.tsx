import { OrdersSelector } from 'app/providers/storeProvider/reducers/OrderSlice';
import { UserIsAuthSelector } from 'app/providers/storeProvider/reducers/UserSlice';
import Order, { ColumnsProps, Product, ProductPrice } from 'app/providers/storeProvider/types';
import React, { useEffect, useState } from 'react';
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from "./ProductsPage.module.scss"
import { ProductsSelector, getOProducts, getSortedProducts } from 'app/providers/storeProvider/reducers/ProductSlice';
import { DropDirection } from 'react-bootstrap/esm/DropdownContext';
import { Products } from 'widgets/Products';
import { ActionButton } from 'shared/ui/ActionButton';
import AddButton from "shared/assets/icons/AddButton.svg"
import { Select } from 'shared/ui/Select/Select';


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

    const [selectedSort, setSelectedSort] = useState("")

    useEffect(() => {
        if (Authorization) {
            //@ts-ignore
            dispatch(getOProducts())
        }
           
    }, [Authorization])

    const sortProducts = (sortType:string) => {
        setSelectedSort(sortType)
        dispatch(getSortedProducts(sortType))
    }

    return (
        <div>
            {Authorization == true?
            <div className={classNames(cls.pageWrapper, {}, ["products"])}>
             <div className={cls.productTitle__header}>
                <div className={cls.productTitle}>
                    <ActionButton isBorder={true} iconImage={<AddButton />} onClick={() =>{} } />
                    <h1>{t("pageTitle", { dataCount: products.length })}</h1>
                </div>
                <Select 
                    defaultValue={t("sortingDefault")}
                    value={selectedSort}
                    options={[
                        {value:"type", name:t("selectByType")},
                        {value:"title", name:t("selectByName")}

                    ]}
                    onChange={sortProducts}
                />
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
