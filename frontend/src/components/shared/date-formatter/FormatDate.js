export function formatDate(date) {
    const dateToFormat = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Amsterdam",
    }).format(dateToFormat);

    return formattedDate;
}