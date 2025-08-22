export function waitFor(cond: () => unknown, opts: { interval?: number; timeout?: number } = {}): Promise<void> {
    const interval = opts.interval ?? 300;
    const timeout = opts.timeout ?? 30000;
    return new Promise<void>((resolve, reject) => {
      const t0 = Date.now();
      const id = setInterval(() => {
        try {
          if (Boolean(cond())) {
            clearInterval(id);
            resolve();
          } else if (Date.now() - t0 > timeout) {
            clearInterval(id);
            reject(new Error("waitFor: timeout"));
          }
        } catch (e) {
          clearInterval(id);
          reject(e as Error);
        }
      }, interval);
    });
  }
  