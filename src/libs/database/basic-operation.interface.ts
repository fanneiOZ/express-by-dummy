export interface BasicOperationInterface<T> {
    read(...args: unknown[]): Promise<T>

    create(writable: T): Promise<void>

    delete(writable: T): Promise<void>

    update(writable: T): Promise<void>
}