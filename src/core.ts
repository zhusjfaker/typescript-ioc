import 'reflect-metadata'

interface AutoBuildInfo {
    keyName: string;
    keyType: Function;
}

export function Injectable(_constructor: Function) {
    let paramTypes: Array<Function> = Reflect.getMetadata('design:paramtypes', _constructor)
    //已注册
    if (IOC.classContainer.indexOf(_constructor) != -1) return;
    for (let val of paramTypes) {
        if (val === _constructor) throw new Error('不能依赖自己');
        else if (IOC.classContainer.indexOf(val) == -1) throw new Error(`${val}没有被注册`);
    }
    //注册
    IOC.classContainer.push(_constructor);

}

export function Autowired() {
    return function (target: any, propertyName: string) {
        var _class: Function = Reflect.getMetadata("design:type", target, propertyName);
        if (!target.constructor.prototype.$$ejectprop) {
            target.constructor.prototype.$$ejectprop = [];
        }
        target.constructor.prototype.$$ejectprop.push({
            keyName: propertyName,
            keyType: _class
        });
    }
}

export class IOC {
    public static classContainer: Array<Function> = [];

    public static classFactory<T>(_constructor: { new(...args: Array<any>): T }): T {
        let paramTypes: Array<Function> = Reflect.getMetadata('design:paramtypes', _constructor);
        //参数实例化
        let paramInstance = paramTypes.map((val: Function) => {
            //依赖的类必须全部进行注册
            if (IOC.classContainer.indexOf(val) == -1) throw new Error(`${val}没有被注册`)
            //参数还有依赖
            else if (val.length) {
                return this.classFactory(val as any);
            }
            //没有依赖直接创建实例
            else {
                return new (val as any)();
            }
        });
        let autolist: Array<AutoBuildInfo> = (_constructor as Function).prototype.$$ejectprop;
        let result = new _constructor(...paramInstance);
        if (autolist && autolist.length > 0) {
            for (let item of autolist) {
                result[item.keyName] = this.classFactory(item.keyType as any);
            }
            Reflect.deleteProperty(result.constructor.prototype, '$$ejectprop');
        }
        return result
    }
}