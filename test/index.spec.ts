import { configure, Container } from '../src'

import { Bar, Baz, Foo } from './declare'

test('basic usage', async () => {
  const container = new Container()
  await configure(container, __dirname + '/declare.ts')
  const foo = container.get(Foo)
  expect(foo).toBeInstanceOf(Foo)
  expect(foo.bar).toBeInstanceOf(Bar)
  expect(foo.baz).toBeInstanceOf(Baz)
})
