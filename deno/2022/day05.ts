import { readInput, readInputLines } from "../utils/read-input.ts";

type SupplyStacks = {
    crates: string[][];
    moves: {
        count: number;
        from: number;
        to: number;
    }[];
};

async function parseInput(year: number, day: number): Promise<SupplyStacks> {
    const [wholeStacksText, movesText] = (await readInput(year, day)).split(
        "\n\n"
    );

    const [stacksIndexText, ...stacksText] = wholeStacksText
        .split("\n")
        .reverse();

    const cratesIndexMap = new Map<number, number>(
        stacksIndexText
            .match(/\d+/g)
            ?.map((stack) => [
                parseInt(stack, 10),
                stacksIndexText.indexOf(` ${stack} `) + stack.length,
            ])
    );

    const crates: string[][] = [];
    for (const stackText of stacksText) {
        for (const [crate, index] of cratesIndexMap.entries()) {
            const item = stackText.at(index);
            if (item && /\w/.test(item)) {
                (crates[crate] || (crates[crate] = [])).push(item);
            }
        }
    }

    return {
        crates,
        moves: movesText.split("\n").map((move) => {
            const [_, count, from, to] =
                move.match(/move (\d+) from (\d+) to (\d+)/) ?? [];

            return {
                count: parseInt(count, 10),
                from: parseInt(from, 10),
                to: parseInt(to, 10),
            };
        }),
    };
}

function executeMoves(
    crates: SupplyStacks["crates"],
    moves: SupplyStacks["moves"],
    model: "9000" | "9001" = "9000"
): string {
    for (const { count, from, to } of moves) {
        if (model === "9000") {
            for (let i = 0; i < count; i++) {
                const item = crates[from].pop();
                if (item) {
                    crates[to].push(item);
                }
            }
        } else if (model === "9001") {
            const startIndex = Math.max(crates[from].length - count, 0);
            const removeCount = Math.min(crates[from].length, count);
            const items = crates[from].splice(startIndex, removeCount);
            crates[to].push(...items);
            console.log({
                from: crates[from],
                to: crates[to],
                items,
                startIndex,
                removeCount,
            });
        }
    }

    return crates
        .filter(Boolean)
        .map((crate) => crate[crate.length - 1])
        .join("");
}

export const day05 = {
    async partA(year: number, day: number): Promise<string> {
        const { crates, moves } = await parseInput(year, day);
        return executeMoves(crates, moves);
    },
    async partB(year: number, day: number): Promise<string> {
        const { crates, moves } = await parseInput(year, day);
        return executeMoves(crates, moves, "9001");
    },
};

export default day05;
