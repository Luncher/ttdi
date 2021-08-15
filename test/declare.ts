import { Inject, Injectable } from '../src'

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
