class NextId {
    private static mappedKeyId: { [key: string]: number } = {};

    public static next(name = "global"): number {
        if (!(name in NextId.mappedKeyId)) {
            NextId.mappedKeyId[name] = 0;
        }

        NextId.mappedKeyId[name]++;

        return NextId.mappedKeyId[name];
    }
}

function getOrDefault<T>(optionalValue: T | undefined, defaultValue: T): T {
    if (optionalValue === undefined) return defaultValue;
    else return optionalValue;
}

function CloneReturnValue(target: unknown, key: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value;

    descriptor.value = function (...args: unknown[]): unknown {
        const ret = original.apply(this, args);
        if (ret && ret instanceof Object) return { ...ret };
        else return ret;
    };

    return descriptor;
}

export { NextId, getOrDefault, CloneReturnValue };
