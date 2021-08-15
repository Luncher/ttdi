import { classDepsKey, classKey } from './constants'

export function Injectable(...args: any[]) {
  return function <T>(ctor: T): T {
    const deps = Reflect.getMetadata("design:paramtypes", ctor)
    Reflect.defineMetadata(classKey, { args }, ctor)
    if (Array.isArray(deps) && deps.length > 0) {
      Reflect.defineMetadata(classDepsKey, { deps }, ctor)
    }
    return ctor
  }
}
