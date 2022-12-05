import { DaySolution } from "./types/day-solution.type.ts";

function noop(..._args: unknown[]) {
    return "";
}

if (import.meta.main) {
    const [year, day] = Deno.args.map((val) => parseInt(val, 10));

    const solution: DaySolution = await import(
        `./${year}/day${day.toString().padStart(2, "0")}.ts`
    )
        .then((module) => module.default)
        .catch(() => {
            console.error(
                `File "./${year}/day${day
                    .toString()
                    .padStart(2, "0")}.ts" not found`
            );
            Deno.exit(1);
        });

    console.log(
        `Year ${year}, Day ${day}, Part A: ${await (solution?.partA ?? noop)(
            year,
            day
        )}`
    );
    console.log(
        `Year ${year}, Day ${day}, Part B: ${await (solution?.partB ?? noop)(
            year,
            day
        )}`
    );
}
