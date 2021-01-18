class NextId {
    private static mappedKeyId: { [key: string]: number };

    public static next(name = "global"): number {
        if (!(name in NextId.mappedKeyId)) {
            NextId.mappedKeyId[name] = 0;
        }

        NextId.mappedKeyId[name]++;

        return NextId.mappedKeyId[name];
    }
}

export { NextId };
