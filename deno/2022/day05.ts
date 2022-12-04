import { readInputLines } from "../utils/read-input.ts";

export default {
    "5": {
        async partA(year: number, day: number): Promise<string> {
            return (await readInputLines(year, day)).toString();
        },
        async partB(year: number, day: number): Promise<string> {
            return (await readInputLines(year, day)).toString();
        },
    },
};
