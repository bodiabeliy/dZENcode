import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import Logo from "shared/assets/icons/logo.svg"
import { useTranslation } from "react-i18next";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "widgets/Forms";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserCurrentSesstionCountSelector, UserEmailSelector, UserIsAuthSelector, logoutUserSuccess, userSessionCount } from "app/providers/storeProvider/reducers/UserSlice";
import { SocketClient } from "shared/lib/socketClient/socketClient";
import { dateFormater } from "shared/lib/dateFormater/dateFormater";
interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    const isAuthorization = useSelector(UserIsAuthSelector)
    const userSesstion = useSelector(UserCurrentSesstionCountSelector)
    const userEmail = useSelector(UserEmailSelector)
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation();

    const [isRegistrationOpen, setIsRegstrationOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [formType, setFormType] = useState('')
    const [date, setDate] = useState<string>("")

    
    const updateTimeRef = useRef<NodeJS.Timeout>()
    useEffect(()=> {
        if (isAuthorization) {
            SocketClient.connect()
            SocketClient.on("sesstionCountUpdate", (sesstionCounter:number) => { 
                console.log("sesstionCounter", sesstionCounter);
                
                dispatch(userSessionCount(sesstionCounter))
            })
        }
    }, [isAuthorization, dispatch])

    useEffect(() => {
        updateTimeRef.current =setInterval(() => {
            setDate(dateFormater(new Date()))
        }, 1000)
    }, [date])

    const OpenModal = useCallback((formType:string) => {

        if (formType == "registrationForm") {
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

    
    const Logout = useCallback((formType:string) => {
        dispatch(logoutUserSuccess());
        localStorage.removeItem('token');
        setFormType("")
        SocketClient.disconnect()
        clearInterval(updateTimeRef.current)

    }, [date])

    return (
        <>
        <Modal isOpen={formType =="registrationForm"?isRegistrationOpen:isOpen} onClose={() => CloseModal(formType)} children={<LoginForm formType={formType} />}/>
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.logo}>
                <Logo />
                <div className={cls.logoText}>
                    Inventory
                </div>
            </div>
            <div className={cls.links}>
                {isAuthorization == false ?
                    <>
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
                    </>
                :<>
                   
                    <div className={cls.navbar__userPanel}>
                        <div className={cls.navbar__userTime}>
                            {date}
                        </div>
                            <div className={cls.navbar__userSession}>
                            {
                                userSesstion == 1 ? 
                                <span> {t("currentSession")+ ":"+ userEmail?.split("@")[0]}</span>
                                : <span>{t("countSession")+ ": "+ userSesstion }</span>
                            }

                            </div>
                    </div>
                    <AppLink 
                        onClick={() => Logout(formType)}
                        theme={AppLinkTheme.SECONDARY} to={'/'} className={cls.LoginLink}>
                        {t('Logout')}
                    </AppLink>
                </>
                }
                
            </div>
        </div>
        </>
    );
};




