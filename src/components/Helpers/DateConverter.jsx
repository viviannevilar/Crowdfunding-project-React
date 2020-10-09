

function convertDateTime(isoDate, duration) {

    if (isoDate == null) {
        return null
    } else {
        if (duration == null) {
            const dur = 0
        } else {
            const dur = duration
        }
        const date = new Date(isoDate);

        date.setDate(date.getDate() + duration)

        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        const formattedDate = day + "-" + month + "-" + year;
        return formattedDate;
    }

}

export default convertDateTime