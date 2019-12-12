import { BaseDerived } from './base-derived.interface';

export interface BaseBuild<T, U = any> {
  readonly value: T;
  readonly derived: BaseDerived<T, U>[];
}
