import { propsKey } from "./constants"

export function Inject(target: object, targetKey: string) {  
  const annotationTarget = target.constructor

  let propsMetadata: Record<string, unknown> = {}
  if (Reflect.hasMetadata(propsKey, annotationTarget)) {
    propsMetadata = Reflect.getMetadata(propsKey, annotationTarget)
  }

  const targetCtor = Reflect.getMetadata("design:type", target, targetKey);
  propsMetadata[targetKey] = {
    value: targetCtor
  }
  Reflect.defineMetadata(propsKey, propsMetadata, annotationTarget)
}
