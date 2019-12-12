import { Derived } from './derived';

export interface BaseDerived<TOwner = any, TProperty = any> {
  derived: Derived<TOwner, TProperty>;
  key: string;
}
