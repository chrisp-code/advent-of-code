import { DaySolution } from "../types/day-solution.type.ts";
import { readInput } from "../utils/read-input.ts";

async function calculateCalories(year: number, day: number): Promise<number[]> {
    return (await readInput(year, day))
        .split("\n\n")
        .map((individual) =>
            individual
                .split("\n")
                .map((cals) => parseInt(cals, 10))
                .reduce((acc, val) => acc + val, 0)
        )
        .sort((a, b) => b - a);
}

export const day01: DaySolution = {
    async partA(year: number, day: number): Promise<string> {
        const [mostCalories] = await calculateCalories(year, day);
        return mostCalories.toString();
    },
    async partB(year: number, day: number): Promise<string> {
        return (await calculateCalories(year, day))
            .slice(0, 3)
            .reduce((acc, val) => acc + val, 0)
            .toString();
    },
};

export default day01;
