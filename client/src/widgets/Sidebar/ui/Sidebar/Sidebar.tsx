import {classNames} from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import {useState} from "react";
import {ThemeSwitcher} from "widgets/ThemeSwitcher/ui/ThemeSwitcher";
import {LangSwitcher} from "widgets/LangSwitcher/ui/LangSwitcher";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Image } from "shared/ui/Image/Image";
import { useTranslation } from "react-i18next";

import UserIcon from "shared/assets/icons/user-32-32.png"

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({className}: SidebarProps) => {
    const { t, i18n } = useTranslation();

    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div
        data-testid="sidebar"
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
           {/* <button onClick={onToggle}>toggle</button> */}
           <div className={classNames(null, {}, ["sideBar__wrapper"])}>
            <div className={cls.sideMenu}>
            <Image image={UserIcon} />
                <AppLink className={cls.sideMenuLink} to={"/orders"}>{t("Orders")}</AppLink>
                <AppLink className={cls.sideMenuLink} to={"/products"}>{t("Products")}</AppLink>
                {/* <AppLink to={"/"}>fgd</AppLink>
                <AppLink to={"/"}>fdju</AppLink>
                <AppLink to={"/"}>sx</AppLink> */}
            </div>

           </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang}/>
            </div>
        </div>
    );
};

