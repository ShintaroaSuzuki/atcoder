import * as fs from "fs";

// import * as readline from 'readline'
// const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
// const ask = (query: string) => new Promise<string>((resolve) => rl.question(query, resolve))
// // Don't forget `rl.close()`.

const INT = Math.floor;

declare global {
    interface Array<T> {
        last(): T | undefined;
        isEmpty(): boolean;
    }
}
Array.prototype.last = function () {
    return this.length === 0 ? undefined : this[this.length - 1];
};
Array.prototype.isEmpty = function () {
    return this.length === 0;
};

const less = <T>(a: T, b: T) => (a == b ? 0 : a < b ? -1 : 1);
const greater = <T>(a: T, b: T) => (a == b ? 0 : a < b ? 1 : -1);
const bigIntMax = (...args: bigint[]) => args.reduce((m, e) => (e > m ? e : m));
const bigIntMin = (...args: bigint[]) => args.reduce((m, e) => (e < m ? e : m));
const bigIntAbs = (arg: bigint) => (arg < 0 ? -arg : arg);

declare const stdin: number;
function read_stdin() {
    return fs.readFileSync(
        process.env.NODE_ENV === "debug" ? stdin : process.stdin.fd,
        "utf8"
    );
}
class Input {
    readonly inputs: string[];
    private index = 0;
    constructor(str?: string) {
        this.inputs = (str ? str : read_stdin()).split(/\s+/);
    }
    number() {
        return Number(this.inputs[this.index++]);
    }
    numbers(n: number) {
        return this.inputs.slice(this.index, (this.index += n)).map(Number);
    }
    bigint() {
        return BigInt(this.inputs[this.index++]);
    }
    bigints(n: number) {
        return this.inputs.slice(this.index, (this.index += n)).map(BigInt);
    }
    word() {
        return this.inputs[this.index++];
    }
    words(n: number) {
        return this.inputs.slice(this.index, (this.index += n));
    }
}

function array<T>(len: number, init: T): T[] {
    return Array(len).fill(init);
}

function array2<T>(h: number, w: number, init: T): T[][] {
    return array(h, 0).map(() => array(w, init));
}

function main() {
    const input = new Input();

    const A = input.number();
    const B = input.number();

    let res = "";

    if (0 < A && B === 0) {
        res = "Gold";
    } else if (A === 0 && 0 < B) {
        res = "Silver";
    } else {
        res = "Alloy";
    }

    console.log(res);
}

main();
