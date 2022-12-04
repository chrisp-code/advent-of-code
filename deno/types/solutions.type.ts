export type PartFn = (year: number, day: number) => string | Promise<string>;
export type DaySolution = Record<number, { partA?: PartFn; partB?: PartFn }>;
export type Solutions = Record<number, DaySolution>;
