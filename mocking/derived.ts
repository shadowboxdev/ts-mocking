export class Derived<TOwner, TProperty> {
  constructor(readonly func: (owner: TOwner, seq: number) => TProperty) {}

  public build(owner: TOwner, seq: number): TProperty {
    const ret = this.func(owner, seq);
    return ret;
  }
}
