export class Generator<T> {
  constructor(readonly func: (seq: number) => T) {}

  public build(seq: number): T {
    return this.func(seq);
  }
}
