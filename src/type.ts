export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR_Partial<T, U> = (Without<T, U> & Partial<U>) | (Without<U, T> & Partial<T>);
// https://stackoverflow.com/questions/41476063/typescript-remove-key-from-type-subtraction-type
export type Substract<T, U> = { [P in Exclude<keyof T, keyof U>]?: T[P] };
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export enum DataType {
    Array = "array",
    Boolean = "boolean",
    Integer = "integer",
    Number = "number",
    Object = "object",
    String = "string",
    Null = "null",
}
