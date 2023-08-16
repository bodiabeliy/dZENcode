import React from 'react';
import { useTranslation } from 'react-i18next';

const OrdersPage = () => {
    const { t, i18n } = useTranslation("orders");

    return (
        <div>
           {t("pageTitle")}
        </div>
    );
};

export default OrdersPage;
