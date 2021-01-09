
class NextId {
    private static mappedKeyId: {[key: string]: number};    

    public static next(name: string = "global") {
        
        if ( !(name in NextId.mappedKeyId) ) {
            NextId.mappedKeyId[name] = 0;
        }

        NextId.mappedKeyId[name]++;

        return NextId.mappedKeyId;
    }
}

export {NextId};