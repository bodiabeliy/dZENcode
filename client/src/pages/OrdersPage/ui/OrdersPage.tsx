import React from 'react';
import {useTranslation} from "react-i18next";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from "./OrdersPage.module.scss"

const AboutPage = () => {
    const {t} = useTranslation("orders");

    return (
        <div>
            <div className={classNames(cls.pageWrapper, {}, ["orders"])}>
            {t('pageTitle')}

            </div>
        </div>
    );
};

export default AboutPage;
