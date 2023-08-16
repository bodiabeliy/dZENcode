import React from 'react';
import {useTranslation} from "react-i18next";

const AboutPage = () => {
    const {t} = useTranslation("products");

    return (
        <div>
            {t('pageTitle')}
        </div>
    );
};

export default AboutPage;
