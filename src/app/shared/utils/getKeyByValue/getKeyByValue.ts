

export class utility{

    protected getKeyByValue<T extends string | number | symbol, U>(
        map: Record<T, U>,
        value: U
    ){
        const entries = Object.entries(map) as [T, U][];
        const foundEntry = entries.find(([key, val]) => val === value);
        return foundEntry ? foundEntry[0] : undefined;

    }
}