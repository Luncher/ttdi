import { propsKey, DefaultMetadataKey } from "./constants"

/**
 * 用于属性注入（不带参数）。对应 TypeScript 的 property-decorators。
 * 参考：https://www.typescriptlang.org/docs/handbook/decorators.html#property-decorators
 * @param target 构造器的原型，如：Foo.prototype
 * @param targetKey 属性名称
 */
export function Inject(target: object, targetKey: string) {  
  const annotationTarget = target.constructor

  let propsMetadata: Record<string, unknown> = {}
  if (Reflect.hasMetadata(propsKey, annotationTarget)) {
    propsMetadata = Reflect.getMetadata(propsKey, annotationTarget)
  }

  const targetCtor = Reflect.getMetadata(DefaultMetadataKey.DesignType, target, targetKey);
  propsMetadata[targetKey] = {
    value: targetCtor
  }
  Reflect.defineMetadata(propsKey, propsMetadata, annotationTarget)
}
