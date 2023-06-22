export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR_Partial<T, U> = (Without<T, U> & Partial<U>) | (Without<U, T> & Partial<T>);
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type IntersectionKey<T, U> = Extract<keyof T, keyof U>;
// https://stackoverflow.com/a/63553761
export type KeysMatching<T, V> = { [K in keyof Required<T>]: Required<T>[K] extends V ? K : never }[keyof T];

export enum DataType {
    Array = "array",
    Boolean = "boolean",
    Integer = "integer",
    Number = "number",
    Object = "object",
    String = "string",
    Null = "null",
}
