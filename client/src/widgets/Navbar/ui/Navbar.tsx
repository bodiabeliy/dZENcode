import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import Logo from "shared/assets/icons/logo.svg"
import { useTranslation } from "react-i18next";
import { Modal } from "shared/ui/Modal/Modal";
import { useState } from "react";
interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.logo}>
                <Logo />
                <div className={cls.logoText}>
                    inventory
                </div>
            </div>
            <div className={cls.links}>
                <AppLink 
                    onClick={() => setIsOpen(true)}
                    theme={AppLinkTheme.SECONDARY} to={'/'} className={cls.MainLink}>
                {t('MainLink')}
                </AppLink>
            </div>
        </div>
        </>
    );
};




