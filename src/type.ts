// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR_Partial<T, U> = (Without<T, U> & Partial<U>) | (Without<U, T> & Partial<T>);
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type IntersectionKey<T, U> = Extract<keyof T, keyof U>;

export enum DataType {
    Array = "array",
    Boolean = "boolean",
    Integer = "integer",
    Number = "number",
    Object = "object",
    String = "string",
    Null = "null",
}
