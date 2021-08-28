export type Newable<T> = new (...args: any[]) => T

export type Identifier<T = object> = string | symbol | Newable<T>
