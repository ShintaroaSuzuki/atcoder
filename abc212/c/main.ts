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

// lower_bound
function lowerBound(arr: number[], target: number): number {
    let left = -1;
    let right = arr.length;
    while (right - left > 1) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid;
        } else {
            right = mid;
        }
    }
    return right;
}

// binary_search
function binarySearch(arr: number[], target: number): boolean {
    const right = lowerBound(arr, target);
    return right < arr.length && arr[right] === target;
}

function main() {
    const input = new Input();

    const N = input.number();
    const M = input.number();
    const A = input.numbers(N);
    const B = input.numbers(M);

    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);

    let min = Infinity;
    for (let i = 0; i < N; i++) {
        const a = A[i];
        const j = lowerBound(B, a);
        if (j < M) {
            min = Math.min(min, Math.abs(a - B[j]));
        }
        if (j > 0) {
            min = Math.min(min, Math.abs(a - B[j - 1]));
        }
    }

    console.log(min);
}

main();
