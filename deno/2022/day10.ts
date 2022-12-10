import { readInputLines } from "../utils/read-input.ts";

const Operations = {
    noop: new RegExp("noop", "i"),
    add: new RegExp("add(\\w) (-?\\d+)", "i"),
};

const DEBUG = false;

function cpu(instructions: string[]) {
    const register: Record<string, number> = {};
    const history: number[] = [];
    let cycle = 0;

    const signalStart = 20;
    const signalCycle = 40;
    const signalStrengths: number[] = [];

    const updateClock = () => {
        cycle++;
        history.push(register.x ?? 1);

        if (DEBUG) {
            console.log(`cycle ${cycle} = ${register.x}`);
        }

        if (cycle !== 0 && (cycle - signalStart) % signalCycle === 0) {
            if (DEBUG) {
                console.log(
                    `${cycle} !== 0 || (${
                        cycle - signalStart
                    }) % ${signalCycle} === 0`,
                    `Signal strength: ${cycle * (register.x ?? 1)}`
                );
            }
            signalStrengths.push(cycle * (register.x ?? 1));
        }
    };

    for (const instruction of instructions) {
        switch (true) {
            case Operations.noop.test(instruction): {
                updateClock();
                break;
            }
            case Operations.add.test(instruction): {
                updateClock();
                const [_i, loc, value] = instruction.match(Operations.add) ?? [
                    instruction,
                    "?",
                    "0",
                ];
                updateClock();
                register[loc] = (register[loc] ?? 1) + parseInt(value, 10);
                break;
            }
            default: {
                break;
            }
        }
    }

    if (DEBUG) {
        console.log(signalStrengths, signalStrengths.length);
    }

    return {
        history,
        signalStrengths,
    };
}

export const day09 = {
    async partA(year: number, day: number): Promise<string> {
        const { signalStrengths } = cpu(await readInputLines(year, day));
        return signalStrengths
            .slice(0, 6)
            .reduce((acc, signalStrength) => acc + signalStrength, 0)
            .toString();
    },
    async partB(year: number, day: number): Promise<string> {
        const { history } = cpu(await readInputLines(year, day));

        const CHARS_PER_ROW = 40;

        return history
            .map((spritePos, cycle) =>
                cycle % CHARS_PER_ROW >= spritePos - 1 &&
                cycle % CHARS_PER_ROW <= spritePos + 1
                    ? "#"
                    : "."
            )
            .reduce(
                (screen, char, index) =>
                    screen +
                    char +
                    ((index + 1) % CHARS_PER_ROW === 0 ? "\n" : ""),
                "\n"
            );
    },
};

export default day09;
