import { readInput } from "../utils/read-input.ts";

export function terminal(output: string): Record<string, number> {
    const delimiter = ".";
    const commands = output
        .split("\n$")
        .map((line, index) => (index !== 0 ? `$${line}` : line));
    console.log(commands[0]);

    const totals: Record<string, number> = {};
    const pwd = [];

    for (const command of commands) {
        if (command.startsWith("$ cd")) {
            const arg = command.split(" ").findLast(Boolean);
            arg === ".." ? pwd.pop() : pwd.push(arg);
        } else if (command.startsWith("$ ls")) {
            const [_cmd, ...results] = command.split("\n");
            for (const result of results) {
                const parts = result.split(" ");

                if (
                    parts[0] !== "dir" &&
                    !totals[[...pwd, parts[1]].join(delimiter)]
                ) {
                    const fileSize = parseInt(parts[0]);
                    for (let i = pwd.length - 1; i >= 0; i--) {
                        const p = pwd.slice(0, i + 1).join(delimiter);
                        totals[p] = (totals[p] ?? 0) + fileSize;
                    }
                }
            }
        }
    }

    return totals;
}

export const day07 = {
    async partA(year: number, day: number): Promise<string> {
        const directorySizes = terminal(await readInput(year, day));

        return Object.values(directorySizes)
            .reduce((acc, size) => (size <= 100_000 ? acc + size : acc), 0)
            .toString();
    },
    async partB(year: number, day: number): Promise<string> {
        const directorySizes = terminal(await readInput(year, day));
        const toDelete = 30_000_000 - (70_000_000 - directorySizes["/"]);

        return (
            Object.values(directorySizes)
                .sort((a, b) => a - b)
                .find((size) => size >= toDelete) ?? ""
        )?.toString();
    },
};

export default day07;
