import { readInput } from "../utils/read-input.ts";

enum Direction {
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Right = "right",
}

interface Point {
    r: number;
    c: number;
}

function slice(map: number[][], origin: Point, direction: Direction): number[] {
    let result = [];

    switch (direction) {
        case Direction.Top:
            for (let r = origin.r - 1; r >= 0; r--) {
                result.push(map[r][origin.c]);
            }
            break;
        case Direction.Bottom:
            for (let r = origin.r + 1; r < map.length; r++) {
                result.push(map[r][origin.c]);
            }
            break;
        case Direction.Left:
            result = map[origin.r].slice(0, origin.c).reverse();
            break;
        case Direction.Right:
            result = map[origin.r].slice(origin.c + 1, map[origin.r].length);
            break;
    }

    return result;
}

function directions(
    map: number[][],
    origin: Point
): Record<Direction, number[]> {
    return Object.values(Direction).reduce(
        (acc: Record<Direction, number[]>, direction) => {
            acc[direction] = slice(map, origin, direction);
            return acc;
        },
        {
            [Direction.Top]: [],
            [Direction.Bottom]: [],
            [Direction.Left]: [],
            [Direction.Right]: [],
        }
    );
}

export function visibleFromOutside(input: string): number {
    const heights: number[][] = input
        .split("\n")
        .map((heightRow) =>
            heightRow.split("").map((val) => parseInt(val, 10))
        );

    // All trees on the perimeter are visible by default
    let visible = (heights.length + (heights[0].length - 2)) * 2;

    // Skip the edges by starting indexes at 1 and (end - 1)
    for (let r = 1; r < heights.length - 1; r++) {
        for (let c = 1; c < heights[r].length - 1; c++) {
            if (
                Object.values(directions(heights, { r, c })).some(
                    (slice) => heights[r][c] > Math.max(...slice)
                )
            ) {
                visible += 1;
            }
        }
    }

    return visible;
}

export function scenicScore(input: string): number {
    const heights: number[][] = input
        .split("\n")
        .map((heightRow) =>
            heightRow.split("").map((val) => parseInt(val, 10))
        );

    let highestScore = 0;

    for (let r = 0; r < heights.length - 1; r++) {
        for (let c = 0; c < heights[r].length - 1; c++) {
            const current = heights[r][c];
            const score = Object.values(directions(heights, { r, c }))
                .map((neighbors) => {
                    let score = 0;
                    for (const viewingDistance of neighbors
                        .map((neighbor) => current - neighbor)
                        .map((distance) => distance > 0)) {
                        score += 1;
                        if (!viewingDistance) {
                            return score;
                        }
                    }
                    return score;
                })
                .reduce((acc, multi) => acc * multi, 1);

            highestScore = Math.max(highestScore, score);
        }
    }

    return highestScore;
}

export const day08 = {
    async partA(year: number, day: number): Promise<string> {
        return visibleFromOutside(await readInput(year, day)).toString();
    },
    async partB(year: number, day: number): Promise<string> {
        return scenicScore(await readInput(year, day)).toString();
    },
};

export default day08;
