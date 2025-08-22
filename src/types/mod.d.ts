export {};

type AnyArgs = any[];
type AnyFn = (...args: AnyArgs) => any;

// Callback “patch” de style (args, next) => return
type PatchHook<TArgs extends AnyArgs = AnyArgs, TReturn = any> =
  (args: TArgs, next: (args: TArgs) => TReturn) => TReturn;

declare global {
  const mod: {
    hookFunction<Name extends string, TArgs extends AnyArgs = AnyArgs, TReturn = any>(
      name: Name,
      priority: number,
      cb: PatchHook<TArgs, TReturn>
    ): void;
  };
}