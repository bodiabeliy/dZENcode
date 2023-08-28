import {classNames} from "shared/lib/classNames/classNames";
import cls from './ActionButton.module.scss';
import React, { ReactNode } from "react";
import {Button, ThemeButton} from "shared/ui/Button/Button";

interface ActionButtonProps {
    isBorder:boolean
    iconImage:ReactNode
    className?: string;
    onClick:()=> void
}



export const ActionButton = ({iconImage, className, onClick, isBorder =false}: ActionButtonProps) => {
    const mods: Record<string, boolean> = {
        [cls.actionBorderd]: isBorder,
    };
    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames(cls.ActionButton, mods, [className])}
            onClick={onClick}
        >
            {iconImage}
        </Button>
    );
};

