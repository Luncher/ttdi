import { configure, Container, Inject, Injectable } from '../src'

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

async function test() {
  const container = new Container()

  await configure(container, __dirname + '/test.ts')

  console.log(container.get(Foo))
}

test()
