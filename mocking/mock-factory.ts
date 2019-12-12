import { Generator } from './generator';
import { Factory } from './factory';
import { Builder } from './types';
import { FactoryConfig } from './factory-config.interface';

export function val<T>(v: T): Generator<T> {
  return new Generator(() => v);
}

export function each<T>(f: (seqNum: number) => T): Generator<T> {
  return new Generator(f);
}

export function makeFactory<T>(builder: Builder<T>, config?: FactoryConfig): Factory<T> {
  return new Factory(builder, config);
}

export function makeFactoryWithRequired<T, K extends keyof T>(
  builder: Builder<T, Exclude<keyof T, K>>,
  config?: FactoryConfig
): Factory<T, Exclude<keyof T, K>> {
  return new Factory(builder, config);
}

export { FactoryConfig };
