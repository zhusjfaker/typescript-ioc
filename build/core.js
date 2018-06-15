"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Injectable(_constructor) {
    let paramTypes = Reflect.getMetadata('design:paramtypes', _constructor);
    //已注册
    if (IOC.classContainer.indexOf(_constructor) != -1)
        return;
    for (let val of paramTypes) {
        if (val === _constructor)
            throw new Error('不能依赖自己');
        else if (IOC.classContainer.indexOf(val) == -1)
            throw new Error(`${val}没有被注册`);
    }
    //注册
    IOC.classContainer.push(_constructor);
}
exports.Injectable = Injectable;
function Autowired() {
    return function (target, propertyName) {
        var _class = Reflect.getMetadata("design:type", target, propertyName);
        if (!target.constructor.prototype.$$ejectprop) {
            target.constructor.prototype.$$ejectprop = [];
        }
        target.constructor.prototype.$$ejectprop.push({
            keyName: propertyName,
            keyType: _class
        });
    };
}
exports.Autowired = Autowired;
class IOC {
    static classFactory(_constructor) {
        let paramTypes = Reflect.getMetadata('design:paramtypes', _constructor);
        //参数实例化
        let paramInstance = paramTypes.map((val) => {
            //依赖的类必须全部进行注册
            if (IOC.classContainer.indexOf(val) == -1)
                throw new Error(`${val}没有被注册`);
            //参数还有依赖
            else if (val.length) {
                return this.classFactory(val);
            }
            //没有依赖直接创建实例
            else {
                return new val();
            }
        });
        let autolist = _constructor.prototype.$$ejectprop;
        let result = new _constructor(...paramInstance);
        if (autolist && autolist.length > 0) {
            for (let item of autolist) {
                result[item.keyName] = this.classFactory(item.keyType);
            }
            Reflect.deleteProperty(result.constructor.prototype, '$$ejectprop');
        }
        return result;
    }
}
IOC.classContainer = [];
exports.IOC = IOC;
//# sourceMappingURL=core.js.map