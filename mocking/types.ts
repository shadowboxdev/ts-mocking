import { Derived } from './derived';
import { RecPartial } from './utils';
import { Generator } from './generator';

export type FactoryFunc<T, K extends keyof T> = keyof T extends K
  ? (item?: RecPartial<T>) => T
  : (item: RecPartial<T> & Omit<T, K>) => T;

export type ListFactoryFunc<T, K extends keyof T> = keyof T extends K
  ? (count: number, item?: RecPartial<T>) => T[]
  : (count: number, item: RecPartial<T> & Omit<T, K>) => T[];

export type Builder<T, K extends keyof T = keyof T> = {
  [P in K]: T[P] | Generator<T[P]> | Derived<T, T[P]>
};
