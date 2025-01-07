export function tryCatchWrapper<T extends (...args: any[]) => any>(
    fn: T,
    errorHandler: (error: unknown) => void = console.error
  ): (...args: Parameters<T>) => Promise<ReturnType<T> | null> {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
      try {
        return await Promise.resolve(fn(...args));
      } catch (error) {
        errorHandler(error);
        throw error;
      }
    };
}

