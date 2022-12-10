import { readInputLines } from "../utils/read-input.ts";

interface Point {
    x: number;
    y: number;
}

interface State {
    knots: Point[];
    visited: string[];
}

enum Direction {
    Up = "U",
    Down = "D",
    Left = "L",
    Right = "R",
}

const DEBUG = false;

function printState(knots: Point[]): void {
    const minR = Math.min(Math.min(...knots.map(({ y }) => y)) - 2, 0);
    const maxR = Math.max(Math.max(...knots.map(({ y }) => y)) + 2, 5);
    const minC = Math.min(Math.min(...knots.map(({ x }) => x)) - 2, 0);
    const maxC = Math.max(Math.max(...knots.map(({ x }) => x)) + 2, 5);

    const states: string[][] = [];
    for (let r = minR; r < maxR; r++) {
        const rowState = [];
        for (let c = minC; c < maxC; c++) {
            const knotIndex = knots.findIndex(({ x, y }) => r === y && c === x);

            if (knotIndex === 0) {
                rowState.push("H");
            } else if (knotIndex !== -1) {
                rowState.push(knotIndex.toString());
            } else if (r === 0 && c === 0) {
                rowState.push("s");
            } else {
                rowState.push(".");
            }
        }
        states.unshift(rowState);
    }

    if (DEBUG) {
        console.log(states.map((row) => row.join("")).join("\n"));
        console.log();
    }
}

function applyToHead({ x, y }: Point, direction: Direction): Point {
    switch (direction) {
        case Direction.Up:
            return {
                x,
                y: y + 1,
            };
        case Direction.Down:
            return {
                x,
                y: y - 1,
            };
        case Direction.Left:
            return {
                x: x - 1,
                y,
            };
        case Direction.Right:
            return {
                x: x + 1,
                y,
            };
    }
}

function applyToTail({ x, y }: Point, { x: xh, y: yh }: Point): Point {
    const nextTail = { x, y };

    if (xh == x && Math.abs(y - yh) > 1) {
        if (yh > y) nextTail.y++;
        else nextTail.y--;
    }

    if (yh == y && Math.abs(x - xh) > 1) {
        if (xh > x) nextTail.x++;
        else nextTail.x--;
    }

    if (
        xh != x &&
        yh != y &&
        !(Math.abs(x - xh) == 1 && Math.abs(y - yh) == 1)
    ) {
        if (Math.abs(y - yh) == 1) {
            if (xh > x) nextTail.x++;
            else nextTail.x--;
            nextTail.y = yh;
        }

        if (Math.abs(x - xh) == 1) {
            if (yh > y) nextTail.y++;
            else nextTail.y--;
            nextTail.x = xh;
        }
    }

    if (Math.abs(xh - x) == 2 && Math.abs(yh - y) == 2) {
        if (xh > x) nextTail.x++;
        else nextTail.x--;
        if (yh > y) nextTail.y++;
        else nextTail.y--;
    }

    return nextTail;
}

function apply(knots: Point[], motion: string): State {
    if (DEBUG) {
        console.log(`\n== ${motion} ==\n`);
    }

    const [direction, stepsText] = motion.split(" ") as [Direction, string];
    const steps = parseInt(stepsText, 10);

    const nextKnots: Point[] = knots.map((knot) => ({ ...knot }));
    const visited = [];

    for (let i = 0; i < steps; i++) {
        nextKnots[0] = applyToHead(nextKnots[0], direction);

        for (let h = 0; h < nextKnots.length - 1; h++) {
            nextKnots[h + 1] = applyToTail(nextKnots[h + 1], nextKnots[h]);
        }

        visited.push(
            `${nextKnots[nextKnots.length - 1].x},${
                nextKnots[nextKnots.length - 1].y
            }`
        );

        if (DEBUG) {
            printState(nextKnots);
        }
    }

    return {
        knots: nextKnots,
        visited,
    };
}

function simulate(series: string[], numKnots = 2): Set<string> {
    const knots = [...Array(numKnots).keys()].map(() => ({ x: 0, y: 0 }));

    if (DEBUG) {
        console.log(`== Initial State ==`);
        console.log();
        printState(knots);
    }

    const { visited } = series.reduce(
        ({ knots, visited }, motion) => {
            const { knots: nextKnots, visited: nextVisited } = apply(
                knots,
                motion
            );

            for (const visit of nextVisited) {
                visited.push(visit);
            }

            return {
                knots: nextKnots,
                visited,
            };
        },
        {
            knots,
            visited: ["0,0"],
        }
    );

    return new Set(visited);
}

export const day09 = {
    async partA(year: number, day: number): Promise<string> {
        return simulate(await readInputLines(year, day)).size.toString();
    },
    async partB(year: number, day: number): Promise<string> {
        return simulate(await readInputLines(year, day), 10).size.toString();
    },
};

export default day09;
