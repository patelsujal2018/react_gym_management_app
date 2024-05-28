export function pathString(str) {
    return str.replace('/','');
}

export function currentDate() {
    return new Date().toISOString().split('T')[0];
}