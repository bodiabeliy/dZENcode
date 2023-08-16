import {classNames} from "shared/lib/classNames/classNames";
import cls from './Image.module.scss';
import {ButtonHTMLAttributes, FC} from "react";
import UserIcon from "shared/assets/icons/user-32-32.png"
export enum ThemeImage {
    CLEAR = 'clear',
}

interface ImageProps extends ButtonHTMLAttributes<HTMLImageElement>{
    className?: string;
    theme?: ThemeImage;
}

export const Image: FC<ImageProps> = (props) => {
    const {
        className,
        theme,
        ...otherProps
    } = props;

    return (
        <img
            className={classNames(cls.Image, {[cls[theme]]: true}, [className])}
            {...otherProps}
            src={UserIcon}
            width={"70px"}
         />
            
    );
};

