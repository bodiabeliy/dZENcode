import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import Logo from "shared/assets/icons/logo.svg"
import { useTranslation } from "react-i18next";
interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    const { t, i18n } = useTranslation();

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.logo}>
                <Logo />
                <div className={cls.logoText}>
                    inventory
                </div>
            </div>
            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} to={'/'} className={cls.mainLink}>
                {t('mainLink')}
                </AppLink>
            </div>
        </div>
    );
};




