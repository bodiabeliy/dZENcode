interface SelectOptionsProps {
    options:any[]
    value:string,
    onChange:(data:any) => void,
    defaultValue:string
}

export const Select = ({options, value, onChange, defaultValue}:SelectOptionsProps) => {
    return ( 
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map((option:any) => (
                <option value={option.value}>{option.name}</option>
            ))}
        </select>
     );
}
 