export interface EntityInfo {
    dbName: string
    schemaName?: string
    tableName: string
    schemaDefinitions: []
}


export interface DocumentInterface {
    key: Identifier
}

export abstract class Writable<T> {
    protected key: Identifier

    getKey(): Identifier {
        return this.key
    }

    abstract toJSON(): T
}

export type Identifier = string | number