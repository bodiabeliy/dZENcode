
export const dateFormater =(date:Date) => {
    let transformedDate =date.toUTCString();   
    const weekDays =transformedDate.split(",")[0]
    const monthNames =transformedDate.split(",")[1].split("GMT")[0]
    // console.log("monthNames", monthNames);

    return {weekDays, monthNames}
}
const monthNuberToMonthString = (currentMonthNumber:string):string => {
    var strippedString = Number(parseInt(currentMonthNumber, 10));
    for (let i =1; i <12; i++) {
        if (strippedString ==1) {
            return "Jan"
        } 
        if (strippedString ==2) {
            return "Feb"
        } 
        if (strippedString ==3) {
            return "Mar"
        } 
        if (strippedString ==4) {
            return "Apr"
        } 
        if (strippedString ==5) {
            return "May"
        } 
        if (strippedString ==6) {
            return "Jun"
        } 
        if (strippedString ==7) {
            return "Jul"
        } 
        if (strippedString ==8) {
            return "Aug"
        } 
        if (strippedString ==9) {
            return "Sep"
        } 
        if (strippedString ==10) {
            return "Oct"
        } 
        if (strippedString ==11) {
            return "Nov"
        } 
        if (strippedString ==12) {
            return "Dec"
        } 
    }
}

export const DateTimeFormmater =(date:any):any => {
    let formatDate= date.replaceAll("-","/").split(" ")[0]

    let parts = formatDate.split('/');
    let transformedDate = parts[2] + '/' + monthNuberToMonthString(parts[1]) + '/' + parts[0];
    
    let monthByMonths =parts[1]+"/12"
    
    return {transformedDate, monthByMonths}
}
    