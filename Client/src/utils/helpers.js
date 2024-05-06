export function convertDotNetDate(dotNetDate) {
    const match = /\((\d+)([+-]\d{4})\)/.exec(dotNetDate);
    if (!match) {
        return null;
    }

    const timestamp = parseInt(match[1], 10);
    const offset = parseInt(match[2], 10);

    const date = new Date(timestamp + offset * 60 * 1000);

    return date.toLocaleString();
}

export function convertToCalender(dateString) {
    const match = dateString.match(/\/Date\((\d+)([+-]\d{4})\)\//);

    if (match) {
        const milliseconds = parseInt(match[1], 10);
        const offset = parseInt(match[2], 10);

        const utcDate = new Date(milliseconds + offset * 60 * 1000);
        const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);

        const formattedDate = localDate.toISOString().split("T")[0];
        return formattedDate;
    }
}
