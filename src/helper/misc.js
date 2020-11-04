export function getFullDate(date) {
    return '' + date.getYear() + date.getMonth() + date.getDate();
}

export function getSummary() {
    return {
        count: 5,
        cases: 20,
        stats: [
            {
                name: "Fever",
                percent: 40
            },
            {
                name: "Cough",
                percent: 30
            }
        ]
    };
}
