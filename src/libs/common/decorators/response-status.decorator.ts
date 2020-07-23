export function ResponseStatus(code: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (code < 100 || code > 511) {
      throw new Error("Invalid status code");
    }
    target.setStatus(code);
  };
}
