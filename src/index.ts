import { Injectable, IOC, Autowired } from "./core";

@Injectable
class C {
    constructor() { }

    public d: any = 123
}

@Injectable
class B {
    constructor(private c: C) {
    }

    public getprop() {
        return this.c
    }
}

@Injectable
class A {
    constructor(private b: B) { }
    public getprop() {
        return this.b
    }

    @Autowired() public ko: B
}

let a = IOC.classFactory(A);
let s = a.ko
let b = a.getprop();
let t = IOC.classFactory(C);
let m = new C();
debugger

