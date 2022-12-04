export function intersection<T = unknown>(...arrays: T[][]): T[] {
    return [
        ...new Set(arrays.reduce((a, b) => a.filter((c) => b.includes(c)))),
    ];
}
