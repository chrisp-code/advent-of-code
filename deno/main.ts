// import type { Solutions } from "./types/solutions.type.ts";
// import { y2022 } from "./2022/index.ts";

import { DaySolution } from "./types/day-solution.type.ts";

function noop(..._args: unknown[]) {
    return "";
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const [year, day] = Deno.args.map((val) => parseInt(val, 10));

    const solution: DaySolution = await import(
        `./${year}/day${day.toString().padStart(2, "0")}.ts`
    ).catch(() => {
        console.error(
            `File "./${year}/day${day
                .toString()
                .padStart(2, "0")}.ts" not found`
        );
        Deno.exit(1);
    });

    console.log(solution);

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
