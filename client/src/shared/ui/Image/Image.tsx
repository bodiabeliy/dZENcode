import {classNames} from "shared/lib/classNames/classNames";
import cls from './Image.module.scss';
import {ButtonHTMLAttributes, FC} from "react";
export enum ThemeImage {
    CLEAR = 'clear',
}

interface ImageProps extends ButtonHTMLAttributes<HTMLImageElement>{
    image:string
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
            src={props.image}
            width={"70px"}
         />
            
    );
};

