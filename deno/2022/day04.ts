import { readInputLines } from "../utils/read-input.ts";

async function getRanges(year: number, day: number): Promise<number[][][]> {
    return (await readInputLines(year, day)).map((pairAssignments) =>
        pairAssignments
            .split(",")
            .map((assignment) =>
                (assignment.match(/\d+/g) ?? ["0", "0"]).map((num) =>
                    parseInt(num, 10)
                )
            )
    );
}

function hasEntireOverlap(...ranges: number[][]): boolean {
    return hasOverlap(
        (range1: number[], range2: number[]) =>
            (range1[0] <= range2[0] && range2[1] <= range1[1]) ||
            (range2[0] <= range1[0] && range1[1] <= range2[1]),
        ...ranges
    );
}

function hasAnyOverlap(...ranges: number[][]): boolean {
    return hasOverlap(
        (range1: number[], range2: number[]) =>
            (range1[0] <= range2[1] && range2[0] <= range1[1]) ||
            (range2[0] <= range1[1] && range1[0] <= range2[1]),
        ...ranges
    );
}

function hasOverlap(
    compareFn: (range1: number[], range2: number[]) => boolean,
    ...ranges: number[][]
): boolean {
    const copy = [...ranges];
    do {
        const current = copy.pop();
        if (current && copy.some((range) => compareFn(current, range))) {
            return true;
        }
    } while (copy.length !== 0);

    return false;
}

export default {
    "4": {
        async partA(year: number, day: number): Promise<string> {
            return (await getRanges(year, day))
                .reduce(
                    (total, ranges) =>
                        total + (hasEntireOverlap(...ranges) ? 1 : 0),
                    0
                )
                .toString();
        },
        async partB(year: number, day: number): Promise<string> {
            return (await getRanges(year, day))
                .reduce(
                    (total, ranges) =>
                        total + (hasAnyOverlap(...ranges) ? 1 : 0),
                    0
                )
                .toString();
        },
    },
};
