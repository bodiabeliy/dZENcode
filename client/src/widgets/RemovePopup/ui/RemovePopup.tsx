import { FC, useState, useCallback, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";

import { classNames } from "shared/lib/classNames/classNames";

import cls from "./RemovePopup.module.scss"
import Order from "app/providers/storeProvider/types";
import { useTheme } from "theme/useTheme";

interface RemovePopupProps {
    order:Order;
}



export const RemovePopup:FC<RemovePopupProps> = ({order}) => {
    const { t, i18n } = useTranslation("orders");

    console.log("order", order);
    
    return (
    <>
        <div className={classNames(cls.removeModal__wrapper, {}, [])}>
            <div className={cls.removeModal__header}>
                {t("removeModalTitle")}
            </div>
            <div className={cls.removeModal__body}>

            </div>
            <div className={cls.removeModal__actions}>
               <div className={cls.removeModal__btns}>
                <Button className={classNames(cls.cancelRemove, {}, [cls.actionBtn])}>{t("cancelRemove")}</Button>
                <Button className={classNames(cls.cancelRemove, {}, [cls.actionBtn])}>{t("uproveRemove")}</Button>

               </div>
            </div>
        </div>
    </>
    )
}
 
