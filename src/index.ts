import 'reflect-metadata'

import glob from 'glob'

import { Container } from './container'
import { classKey } from './constants'

export { Injectable } from './injectable'
export { Container } from './container'
export { Inject } from './inject'

export async function configure(container: Container, pattern: string) {
  const files = glob.sync(pattern, {})
  for (const file of files) {
    const exports = await import(file)
    Object.keys(exports).forEach(key => {
      const module = exports[key]
      if (typeof module === 'function' && Reflect.hasOwnMetadata(classKey, module)) {
        const { args } = Reflect.getMetadata(classKey, module)
        container.bind(module, args)
      }
    })
  }
}
