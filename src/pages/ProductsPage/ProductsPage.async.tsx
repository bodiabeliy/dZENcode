import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductsPage = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            {t("pageTitle")}

        </div>
    );
};

export default ProductsPage;
