import {classNames} from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import {useState} from "react";
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";
import {LangSwitcher} from "shared/ui/LangSwitcher/LangSwitcher";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Image } from "shared/ui/Image/Image";
import { useTranslation } from "react-i18next";

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
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
           {/* <button onClick={onToggle}>toggle</button> */}
           <div className={classNames(null, {}, ["sideBar__wrapper"])}>
            <div className={cls.sideMenu}>
            <Image />
                <AppLink className={cls.sideMenuLink} to={"/about"}>{t("Orders")}</AppLink>
                <AppLink className={cls.sideMenuLink} to={"/"}>{t("Products")}</AppLink>
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

