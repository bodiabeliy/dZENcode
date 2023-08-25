import {classNames} from "shared/lib/classNames/classNames";
import cls from './ActionButton.module.scss';
import React from "react";
import {Theme, useTheme} from "app/providers/ThemeProvider";
import LightIcon from 'shared/assets/icons/theme-light.svg';
import TrashIcon from 'shared/assets/icons/trash.svg';
import {Button, ThemeButton} from "shared/ui/Button/Button";

interface ActionButtonProps {
    className?: string;
    onClick:()=> void
}

export const ActionButton = ({className, onClick}: ActionButtonProps) => {

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames(cls.ActionButton, {}, [className])}
            onClick={onClick}
        >
            <TrashIcon />
        </Button>
    );
};

