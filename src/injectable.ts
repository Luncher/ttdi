import { classDepsKey, classKey, DefaultMetadataKey } from './constants'
import { Newable } from './types'

/**
 * 标识一个类可以被注入，对应 TypeScript 的 class decorator
 * 参考：https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators
 * @param args 构造对象的参数
 */
export function Injectable(...args: any[]) {
  return function <T extends Newable<object>>(ctor: T): T {
    const deps = Reflect.getMetadata(DefaultMetadataKey.ParamTypes, ctor)
    Reflect.defineMetadata(classKey, { args }, ctor)
    if (Array.isArray(deps) && deps.length > 0) {
      Reflect.defineMetadata(classDepsKey, { deps }, ctor)
    }
    return ctor
  }
}
