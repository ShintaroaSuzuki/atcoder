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

class PriorityQueue<T = number> {
    private data: T[] = [];
    private tail = 0;
    private degree = 2; // 2 or 4 (N 分木ヒープ)
    constructor(private compare: (a: T, b: T) => number) {}
    get length() {
        return this.tail;
    }
    isEmpty() {
        return this.tail === 0;
    }
    top(): T | undefined {
        return this.data[0];
    }
    private maxHeapify(i: number) {
        let largest = i;
        for (let j = 0; j < this.degree; j++) {
            const c = i * this.degree + j + 1;
            if (c >= this.tail) break;
            if (this.compare(this.data[largest], this.data[c]) > 0) largest = c;
        }
        if (largest != i) {
            [this.data[i], this.data[largest]] = [
                this.data[largest],
                this.data[i],
            ];
            this.maxHeapify(largest);
        }
    }
    pop() {
        if (this.tail === 0) return undefined;
        const top = this.data[0];
        this.data[0] = this.data[this.tail - 1];
        this.data[this.tail - 1] = undefined as any;
        this.tail--;
        this.maxHeapify(0);
        return top;
    }
    push(elem: T) {
        if (this.data.length <= this.tail) this.data.push(elem);
        let i = this.tail;
        // >> はビット演算子で、右に 1 ビットシフトする
        // >> 1 は Math.floor(x / 2) と同じ
        // >> 2 は Math.floor(x / 4) と同じ
        let p = (i - 1) >> (this.degree / 2);
        this.tail++;
        while (i > 0 && this.compare(this.data[p], elem) > 0) {
            this.data[i] = this.data[p];
            i = p;
            p = p = (i - 1) >> (this.degree / 2);
        }
        this.data[i] = elem;
    }
}

function main() {
    const input = new Input();

    const Q = input.number();

    const q = new PriorityQueue<number>((a, b) => a - b);
    let d = 0;

    for (let i = 0; i < Q; i++) {
        const p = input.number();
        if (p === 1) {
            const x = input.number();
            q.push(x - d);
        } else if (p === 2) {
            const x = input.number();
            d += x;
        } else {
            const x = q.pop()!;
            console.log(x + d);
        }
    }
}

main();
