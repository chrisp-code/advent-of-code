import { intersection } from "../utils/intersection.ts";
import { readInput } from "../utils/read-input.ts";

function chunk<T = unknown>(input: T[], size: number): T[][] {
    return input.reduce((arr: T[][], item, idx) => {
        return idx % size === 0
            ? [...arr, [item]]
            : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
}

function split<T = unknown>(array: T[], parts: number): T[][] {
    const size = Math.floor(array.length / parts);
    return chunk(array, size);
}

async function getInput(year: number, day: number): Promise<string[]> {
    return (await readInput(year, day)).trim().split("\n");
}

const priority = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default {
    "3": {
        async partA(year: number, day: number): Promise<string> {
            return (await getInput(year, day))
                .flatMap((contents) => intersection(...split([...contents], 2)))
                .reduce((total, item) => total + priority.indexOf(item), 0)
                .toString();
        },
        async partB(year: number, day: number): Promise<string> {
            return chunk(await getInput(year, day), 3)
                .flatMap((group) =>
                    intersection(...group.map((individual) => [...individual]))
                )
                .reduce((total, item) => total + priority.indexOf(item), 0)
                .toString();
        },
    },
};
