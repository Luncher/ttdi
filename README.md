# tdi

`tdi` is a [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) tool for typescript and javascript.

- property based injection
- constructor based injection
- support for multiple DI containers
- auto collection providers(injectable)

## Quick Start


### Prerequisite

tdi leverage [decorator](https://github.com/tc39/proposal-decorators) and [metadata](https://github.com/rbuckton/reflect-metadata), you need to enable emitting decorator metadata in your Typescript config.Add these two lines to your tsconfig.json file under the compilerOptions key:

```javascript
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

For the decorator of typescript, please refer to [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)


### Install 

```shell
yarn add tdi -S
```

or
```shell
npm i tdi -S
```

---

### Usage


#### declare.ts

```typescript
import { Inject, Injectable } from 'tdi'

@Injectable()
export class Bar {
  constructor() {

  }
}

@Injectable()
export class Baz {

}

@Injectable()
export class Foo {
  @Inject
  baz!: Baz
  constructor(public bar: Bar) {}
}

```

#### main.ts

```typescript
import { configure, Container } from 'tdi'
import { Bar, Baz, Foo } from './declare'

const container = new Container()
await configure(container, __dirname + '/declare.ts')
const foo = container.get(Foo)

expect(foo).toBeInstanceOf(Foo)
expect(foo.bar).toBeInstanceOf(Bar)
expect(foo.baz).toBeInstanceOf(Baz)
```

---

### API

#### @Injectable()

The tag class can be injected as a provider.


#### @Inject()

class property inject. 
>notice: constructor argument will auto injected.


#### configure

a async providers(injectable) loader.

#### container

instance storage container, you can create multi DI containers.
