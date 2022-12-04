export function readInput(year: number, day: number): Promise<string> {
    return Deno.readTextFile(`../input/${year}/${day}.txt`).then((text) =>
        text.trim()
    );
}

export function readInputLines(year: number, day: number): Promise<string[]> {
    return readInput(year, day).then((text) => text.split("\n"));
}
