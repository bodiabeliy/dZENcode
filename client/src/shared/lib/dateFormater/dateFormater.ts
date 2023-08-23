
export const dateFormater =(date:Date) => {
    let transformedDate =date.toUTCString();   
    const weekDays =transformedDate.split(",")[0]
    const monthNames =transformedDate.split(",")[1].split("GMT")[0]

    return {weekDays, monthNames}
}

