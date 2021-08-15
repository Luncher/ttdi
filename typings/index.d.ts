type Newable<T> = new (...args: any[]) => T

type Identifier<T = object> = string | symbol | Newable<T>
