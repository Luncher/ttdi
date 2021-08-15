export function isString(v: unknown) {
  return Object.prototype.toString.call(v) === '[object String]'
}

export function isSymbol(v: unknown) {
  return Object.prototype.toString.call(v) === '[object Symbol]'
}
