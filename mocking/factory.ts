import { cloneDeep } from 'lodash-es';

import { Derived } from './derived';
import { Generator } from './generator';
import { FactoryConfig } from './factory-config.interface';
import { Builder, FactoryFunc, ListFactoryFunc } from './types';
import { RecPartial, recursivePartialOverride } from './utils';

export class Factory<T, K extends keyof T = keyof T> {
  constructor(readonly builder: Builder<T, K>, private readonly config: FactoryConfig | undefined) {
    this.seqNum = this._getStartingSequenceNumber();
  }
  private seqNum: number;

  public one = ((item?: RecPartial<T> & Omit<T, K>): T => {
    return this._build(item);
  }) as FactoryFunc<T, K>;

  public list = ((count: number, item?: RecPartial<T> & Omit<T, K>): T[] => {
    const ts: T[] = Array(count); // allocate to correct size

    for (let i = 0; i < count; i++) {
      ts[i] = this._build(item as any);
    }

    return ts;
  }) as ListFactoryFunc<T, K>;

  public extend(def: RecPartial<Builder<T, K>>): Factory<T, K> {
    const builder = Object.assign({}, this.builder, def);

    return new Factory(builder, this.config);
  }

  public combine<U, K2 extends keyof U>(other: Factory<U, K2>): Factory<T & U, K | K2> {
    const builder: Builder<T & U, K | K2> = Object.assign({}, this.builder, other.builder) as any;

    return new Factory<T & U, K | K2>(builder, this.config);
  }

  public resetSequenceNumber() {
    this.seqNum = this._getStartingSequenceNumber();
  }

  public withDerivation<KOut extends keyof T>(
    kOut: KOut,
    f: (v1: T, seq: number) => T[KOut]
  ): Factory<T, K> {
    const partial: any = {};
    partial[kOut] = new Derived<T, T[KOut]>(f);

    return this.extend(partial);
  }

  private _getStartingSequenceNumber(): number {
    return (this.config && this.config.startingSequenceNumber) || 0;
  }

  private _build(item?: RecPartial<T> & Omit<T, K>): T {
    const seqNum = this.seqNum;
    this.seqNum++;
    const base = buildBase(seqNum, this.builder);
    let v = Object.assign({}, base.value);

    if (item) {
      v = recursivePartialOverride(v, item);
    }

    const keys = Object.keys(item || {});

    for (const der of base.derived) {
      if (keys.indexOf(der.key) < 0) {
        (v as any)[der.key] = der.derived.build(v, seqNum);
      }
    }

    return v;
  }
}

interface BaseDerived {
  derived: Derived<any, any>;
  key: string;
}

interface BaseBuild<T> {
  readonly value: T;
  readonly derived: BaseDerived[];
}

function buildBase<T, K extends keyof T>(seqNum: number, builder: Builder<T, K>): BaseBuild<T> {
  const t: { [key: string]: any } = {};
  const keys = Object.getOwnPropertyNames(builder);
  const derived: BaseDerived[] = [];

  for (const key of keys) {
    const v = (builder as any)[key];
    let value = v;

    if (!!v && typeof v === 'object') {
      if (v.constructor === Generator) {
        value = v.build(seqNum);
      } else if (v.constructor === Derived) {
        derived.push({ key, derived: v });
      } else {
        value = cloneDeep(v);
      }
    }
    t[key] = value;
  }
  return { value: t as T, derived };
}
