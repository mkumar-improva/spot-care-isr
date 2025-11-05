const currentDateTimeVal = (): string => {
    return new Date()
        .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
        .replace(",", "");
}

export { currentDateTimeVal }