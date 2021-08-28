import { classDepsKey, classKey, propsKey } from "./constants"
import { isString, isSymbol } from "./utils"
import type { Identifier, Newable } from './types'

export class Container {
  private ctorMap = new Map<Identifier<unknown>, { ctor: Function, args: any[] }>()

  bind<T>(identifier: Newable<T>, args?: unknown[]): void;
  bind<T>(identifier: Identifier<T>, ctor: T, args?: unknown[]) {
    if (isString(identifier) || isSymbol(identifier)) {
      this.ctorMap.set(identifier, {
        ctor: ctor as unknown as Function,
        args: args || []
      })
    } else {
      this.ctorMap.set(identifier, {
        ctor: identifier as unknown as Function,
        args: (ctor || []) as any[]
      })
    }
  }

  get<T>(identifier: Identifier<T>): T {
    const value = this.ctorMap.get(identifier)

    if (!value) {
      throw new Error("invalid identifier: " + Object(identifier))
    }

    const { ctor, args } = value
    
    let inst: T
    if (Reflect.hasOwnMetadata(classDepsKey, ctor)) {
      const { deps } = Reflect.getMetadata(classDepsKey, ctor)
      const depArgs = deps.map((it: Identifier<unknown>) => this.get(it))
      inst = Reflect.construct(ctor, [...args, ...depArgs])
    } else {
      inst = Reflect.construct(ctor, args)
    }

    const props = Reflect.getMetadata(propsKey, ctor) || {}
    Object.keys(props).forEach((it: string) => {
      const identifier = props[it].value as Identifier;
      (inst as Record<string, any>)[it] = this.get(identifier)
    })

    return inst
  }
}
