"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
let C = class C {
    constructor() {
        this.d = 123;
    }
};
C = __decorate([
    core_1.Injectable,
    __metadata("design:paramtypes", [])
], C);
let B = class B {
    constructor(c) {
        this.c = c;
    }
    getprop() {
        return this.c;
    }
};
B = __decorate([
    core_1.Injectable,
    __metadata("design:paramtypes", [C])
], B);
let A = class A {
    constructor(b) {
        this.b = b;
    }
    getprop() {
        return this.b;
    }
};
__decorate([
    core_1.Autowired(),
    __metadata("design:type", B)
], A.prototype, "ko", void 0);
A = __decorate([
    core_1.Injectable,
    __metadata("design:paramtypes", [B])
], A);
let a = core_1.IOC.classFactory(A);
let s = a.ko;
let b = a.getprop();
let t = core_1.IOC.classFactory(C);
let m = new C();
debugger;
//# sourceMappingURL=index.js.map