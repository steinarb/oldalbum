export function isoNow() {
    new Date().toISOString()
}

export function isoDate(rawdate) {
    return new Date(rawdate).toISOString();
}

export function timePartOfDateTime(rawdate) {
    return isoDate(rawdate).split('T')[1];
}

export function datePartOfDateTime(rawdate) {
    return isoDate(rawdate).split('T')[0];
}

export function replaceDateAndKeepTime(originalDateTime, newdate) {
    const originalTime = timePartOfDateTime(originalDateTime);
    return newdate + 'T' + originalTime;
}
