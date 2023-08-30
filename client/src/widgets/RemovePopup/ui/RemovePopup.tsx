import { FC, useState, useCallback, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";

import { classNames } from "shared/lib/classNames/classNames";

import cls from "./RemovePopup.module.scss"
import Order from "app/providers/storeProvider/types";
import {Image} from "shared/ui/Image/Image"
import TrashIcon from 'shared/assets/icons/trash.svg';
import MockMonitor from 'shared/assets/icons/monitor.jpg';

interface RemovePopupProps {
    pageName:string;
    removeItem:any;
}



export const RemovePopup:FC<RemovePopupProps> = ({removeItem, pageName}) => {
    const { t, i18n } = useTranslation("orders");
    
    return (
    <>
        <div className={classNames(cls.removeModal__wrapper, {}, [])}>
            <div className={cls.removeModal__header}>
                {t("removeModalTitle", { uproveRemoving: pageName })}
            </div>
            <div className={cls.removeModal__body}>
                <div className={cls.removeModal__photo}>
                    <Image image={MockMonitor}/>
                </div>
                <div className={cls.removeModal__item}>
                    {removeItem?.title}
                </div>
            </div>
            <div className={cls.removeModal__actions}>
               <div className={cls.removeModal__btns}>
                <Button className={classNames(cls.cancelRemove, {}, [cls.actionBtn])}>
                    {t("cancelRemove")}</Button>
                <Button className={classNames(cls.cancelRemove, {}, [cls.actionBtn])}>
                <TrashIcon />
                    {t("uproveRemove")}
                </Button>

               </div>
            </div>
        </div>
    </>
    )
}
 
