import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import Logo from "shared/assets/icons/logo.svg"
import { useTranslation } from "react-i18next";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "widgets/Forms";
import { useCallback, useState } from "react";
interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    const { t, i18n } = useTranslation();
    const [isRegistrationOpen, setIsRegstrationOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const [formType, setFormType] = useState('')


    const OpenModal = useCallback((formType:string) => {

        if (formType == "registrationForm") {
            console.log("formType0", formType);
            setFormType(formType)

            setIsRegstrationOpen(true)
        }
        if (formType == "loginForm") {
            setIsOpen(true)
            setFormType(formType)

        }
    }, [formType])

    const CloseModal = useCallback((formType:string) => {
        
        if (formType == "registrationForm") {
            setIsRegstrationOpen(false)
            setFormType("")

        }
        if (formType == "loginForm") {
            setIsOpen(false)
            setFormType("")
        }
    }, [formType])

    return (
        <>
        <Modal isOpen={formType =="registrationForm"?isRegistrationOpen:isOpen} onClose={() => CloseModal(formType)} children={<LoginForm formType={formType} />}/>
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.logo}>
                <Logo />
                <div className={cls.logoText}>
                    inventory
                </div>
            </div>
            <div className={cls.links}>
                <AppLink 
                    onClick={() => OpenModal("registrationForm")}
                    theme={AppLinkTheme.SECONDARY} to={'/'} className={cls.RegisterLink}>
                {t('RegisterLink')}
                </AppLink>
                <AppLink 
                    onClick={() => OpenModal("loginForm")}
                    theme={AppLinkTheme.SECONDARY} to={'/'} className={cls.LoginLink}>
                {t('LoginLink')}
                </AppLink>
            </div>
        </div>
        </>
    );
};




