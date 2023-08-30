import { useTranslation } from "react-i18next";

export const Select = ({option}:any) => {
    const {t} = useTranslation()
    return ( 
        <select name="" id="">
            <option disabled value="">{t("sortingDefault")}</option>
            {option.map((option:any) => (
                <option value={option.value}>{option.titlle}</option>
            ))}
        </select>
     );
}
 