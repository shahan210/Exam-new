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

export const getNextDay = () => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    // tomorrow.setDate(currentDate.getDate() + 1); // Get tomorrow's date
    tomorrow.setDate(currentDate.getDate());

    // Check if tomorrow is Sunday (day of the week === 0)
    if (tomorrow.getDay() === 0) {
        tomorrow.setDate(currentDate.getDate() + 2); // If tomorrow is Sunday, get Monday's date
    }

    return tomorrow;
};

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if necessary
    const day = ("0" + date.getDate()).slice(-2); // Add leading zero if necessary
    return `${year}-${month}-${day}`;
};
export const formatDate2 = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if necessary
    const day = ("0" + date.getDate()).slice(-2); // Add leading zero if necessary
    return `${day}-${month}-${year}`;
};

export function formatDateForInput(dateString) {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate;
}