import { readInput } from "../utils/read-input.ts";

function startOfMarker(input: string, window: number): number {
    const individualChars = input.split("");

    for (let i = window - 1; i < individualChars.length; i++) {
        const chunk = individualChars.slice(i - window, i);
        if (new Set(chunk).size === window) {
            return i;
        }
    }

    return -1;
}

export const day06 = {
    async partA(year: number, day: number): Promise<string> {
        return startOfMarker(await readInput(year, day), 4).toString();
    },
    async partB(year: number, day: number): Promise<string> {
        return startOfMarker(await readInput(year, day), 14).toString();
    },
};

export default day06;
