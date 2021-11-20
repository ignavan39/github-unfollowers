export class BotException<
  T extends string | { code: string; payload?: any },
> extends Error {
  public constructor(public readonly errors: T | ReadonlyArray<T>) {
    super();
  }
}
