export function DI<T extends { new (...args: any[]): {} }>(constructor: T) {
  constructor.prototype.injected = true;
  return constructor;
}
