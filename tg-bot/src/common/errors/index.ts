export class BotException<
  T extends string | { code: String; payload?: any },
> extends Error {
  public constructor(public readonly errors: T | ReadonlyArray<T>) {
    super();
  }
}
