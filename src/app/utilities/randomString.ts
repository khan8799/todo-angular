export function randomString(): string {
    const rand = () =>  Math.random().toString(36).substr(2);
    return rand() + rand();
}

export function randomNumber(limit = 100): number {
    return Math.floor(Math.random() * limit);
}

export const randomColor = () => "rgb(" + randomNumber(256) + "," + randomNumber(256) + "," + randomNumber(256) + ")";