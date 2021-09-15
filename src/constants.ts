import type { Identifier } from './types'

/** 用于标识构造器本身（类） */
export const classKey: Identifier = 'IOC:Injectable'

/** 用于标识构造器构造对象时依赖的参数 */
export const classDepsKey: Identifier = 'IOC:DepsKey'

/** 用于标识构造器的成员属性 */
export const propsKey: Identifier = 'IOC:InjectProps'

/** reflect-metadata 自动生成的设计时类型信息 */
export enum DefaultMetadataKey {
  /** 用于标识成员变量/成员函数设计时的类型 */
  DesignType = 'design:type',
  /** 用于标识构造器/成员函数的参数类型 */
  ParamTypes = 'design:paramtypes',
  /** 用于标识成员函数的返回值类型 */
  ReturnType = 'design:returntype'
}
