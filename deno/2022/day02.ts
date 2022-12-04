import { readInput } from "../utils/read-input.ts";

// A = X = 'Rock' = 1
// B = Y = 'Paper' = 2
// C = Z = 'Scissors' = 3

async function getRounds(year: number, day: number): Promise<string[]> {
    return (await readInput(year, day)).trim().split("\n");
}

const gameRules: Record<string, number> = {
    "A Z": 3 + 0, // lose
    "B X": 1 + 0, // lose
    "C Y": 2 + 0, // lose
    "A X": 1 + 3, // draw
    "B Y": 2 + 3, // draw
    "C Z": 3 + 3, // draw
    "A Y": 2 + 6, // win
    "B Z": 3 + 6, // win
    "C X": 1 + 6, // win
};

export const day02 = {
    async partA(year: number, day: number): Promise<string> {
        return (await getRounds(year, day))
            .reduce((total, round) => total + (gameRules[round] ?? 0), 0)
            .toString();
    },
    async partB(year: number, day: number): Promise<string> {
        const conversion: Record<string, Record<string, string>> = {
            // lose
            X: {
                A: "Z",
                B: "X",
                C: "Y",
            },
            // draw
            Y: {
                A: "X",
                B: "Y",
                C: "Z",
            },
            // win
            Z: {
                A: "Y",
                B: "Z",
                C: "X",
            },
        };

        return (await getRounds(year, day))
            .map((round) => round.split(" "))
            .reduce(
                (total, [opp, outcome]) =>
                    total + gameRules[`${opp} ${conversion[outcome][opp]}`],
                0
            )
            .toString();
    },
};

export default day02;
