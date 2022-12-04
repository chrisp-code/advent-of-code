import type { Solutions } from "./types/solutions.type.ts";
import { y2022 } from "./2022/index.ts";

function noop(..._args: unknown[]) {
    return "";
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    const solutions: Solutions = {
        "2022": y2022,
    };

    const [year, day] = Deno.args.map((val) => parseInt(val, 10));
    const solution = solutions[year][day];

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
