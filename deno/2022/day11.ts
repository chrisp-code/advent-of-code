import { readInput } from "../utils/read-input.ts";

interface Monkey {
    items: number[];
    operation: (old: number) => number;
    test: (next: number) => boolean;
    divisor: number;
    outcome: {
        true: number;
        false: number;
    };
}

const DEBUG = false;

function operationFn(args: (string | number)[]): (old: number) => number {
    return (old: number) => {
        const [varA, operator, varB] = args;
        const operations: Record<string, (args: number[]) => number> = {
            "+": (args: number[]) =>
                args.slice(1).reduce((acc, val) => acc + val, args[0]),
            "-": (args: number[]) =>
                args.slice(1).reduce((acc, val) => acc - val, args[0]),
            "*": (args: number[]) =>
                args.slice(1).reduce((acc, val) => acc * val, args[0]),
            "/": (args: number[]) =>
                args.slice(1).reduce((acc, val) => acc / val, args[0]),
        };

        const settleValues = (...args: (number | string)[]) =>
            args.map((arg) => (typeof arg === "number" ? arg : old));

        return (operations[operator] ?? ((..._args: number[]) => old))(
            settleValues(varA, varB)
        );
    };
}

function testFn({
    operator,
    value,
}: {
    operator: string;
    value: number;
}): (value: number) => boolean {
    return (next: number) => {
        switch (operator.toLowerCase()) {
            case "divisible":
                return next % value === 0;
            default:
                return false;
        }
    };
}

function parseRules(input: string): Monkey[] {
    return input.split("\n\n").map((def) =>
        def
            .split("\n")
            .slice(1)
            .map((line) => line.trim())
            .reduce((monkey: Monkey, line: string) => {
                const [identifier, args] = line.split(": ");
                switch (identifier.toLowerCase()) {
                    case "starting items":
                        monkey.items = args
                            .split(", ")
                            .map((val) => parseInt(val, 10));
                        break;
                    case "operation":
                        monkey.operation = operationFn(
                            args
                                .split(" = ")[1]
                                .split(" ")
                                .map((op) => {
                                    const parseResult = parseFloat(op);
                                    return Number.isNaN(parseResult)
                                        ? op
                                        : parseResult;
                                })
                        );
                        break;
                    case "test": {
                        const [operator, value] = args.split(" by ");
                        monkey.divisor = parseInt(value, 10);
                        monkey.test = testFn({
                            operator,
                            value: monkey.divisor,
                        });
                        break;
                    }
                    case "if true":
                        monkey.outcome = {
                            ...monkey.outcome,
                            true: parseInt(
                                (args.match(/\d+$/) ?? ["0"])[0],
                                10
                            ),
                        };
                        break;
                    case "if false":
                        monkey.outcome = {
                            ...monkey.outcome,
                            false: parseInt(
                                (args.match(/\d+$/) ?? ["0"])[0],
                                10
                            ),
                        };
                        break;
                }
                return monkey;
            }, {} as Monkey)
    );
}

function calcMonkeyBusiness(
    monkeys: Monkey[],
    hasRelief: boolean,
    rounds: number
): number {
    const inspections = monkeys.map(() => 0);
    const items: number[][][] = monkeys.map((m) =>
        m.items.map((n) => Array(monkeys.length).fill(n))
    );

    for (let r = 0; r < rounds; r++) {
        for (let m = 0; m < monkeys.length; m++) {
            if (DEBUG) {
                console.log(`Monkey ${m}:`);
            }

            const monkey = monkeys[m];

            items[m].forEach((ns: number[]) => {
                if (DEBUG) {
                    console.log(
                        `  Monkey inspects an item with a worry level of ${ns}`
                    );
                }

                const _n = ns.map((n, i) => {
                    const newWorryLevel = monkey.operation(n);
                    if (DEBUG) {
                        console.log(`    Worry level is now ${newWorryLevel}`);
                    }
                    return hasRelief
                        ? Math.floor(newWorryLevel / 3)
                        : newWorryLevel % monkeys[i].divisor;
                });

                if (DEBUG) {
                    console.log(`    Worry reduces to ${_n[m]}`);
                }

                const result = monkey.test(_n[m]);
                const passTo = monkey.outcome[`${result}`];
                if (passTo === null || passTo === undefined) {
                    console.log({
                        passTo,
                    });
                }
                if (DEBUG) {
                    console.log(
                        `    Current worry level ${
                            result ? "satisfies" : "does not satisfy"
                        } condition`
                    );
                    console.log(
                        `    Item with worry level ${_n[m]} is thrown to monkey ${passTo}`
                    );
                }

                items[passTo].push(_n);
                inspections[m] += 1;
            });

            items[m] = [];
        }

        if (r + 1 === 1 || r + 1 === 20 || (r + 1) % 1000 === 0) {
            console.log(
                `\n== After round ${r + 1} ===\n${inspections
                    .map(
                        (inspection, index) =>
                            `Monkey ${index} inspected items ${inspection} times.`
                    )
                    .join("\n")}`
            );
        }
    }

    const indexesByHighestValue = [...inspections].sort((a, b) => b - a);

    console.log({
        worryLevels: monkeys.map(({ items }) => items),
        inspections,
        indexesByHighestValue,
    });

    return indexesByHighestValue[0] * indexesByHighestValue[1];
}

export const day09 = {
    async partA(year: number, day: number): Promise<string> {
        const monkeys = parseRules(await readInput(year, day));
        return calcMonkeyBusiness(monkeys, true, 20).toString();
    },
    async partB(year: number, day: number): Promise<string> {
        const monkeys = parseRules(await readInput(year, day));
        return calcMonkeyBusiness(monkeys, false, 10000).toString();
    },
};

export default day09;
