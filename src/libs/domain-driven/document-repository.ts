import {DbAdaptorAbstract} from "../database/db-adaptor.abstract";
import {EntityInfo, Writable} from "./interfaces/repository.interface";

export abstract class DocumentRepository<T> {
    protected constructor (
        protected db: DbAdaptorAbstract,
        protected readonly entityInfo: EntityInfo
    ) {}

    abstract createPersistence(writable: Writable<T>): unknown

    abstract createWritable(document: T): Writable<T>

    async create(document: Writable<T>): Promise<void> {
        await this.db.insert(this.entityInfo, document.toJSON())
    }

    async read(conditions: unknown): Promise<Writable<T>> {
        const data = await this.db.select(this.entityInfo, 'query') as T

        return this.createWritable(data)
    }

    async update(writable: Writable<T>): Promise<void> {
        const persisting = this.createPersistence(writable)

        await this.db.update(this.entityInfo, persisting)
    }

    async delete(writable: T): Promise<void> {
        const query = ''

        await this.db.delete(this.entityInfo, query)
    }

    async createRepository(): Promise<boolean> {
        return this.db.createEntity(this.entityInfo)
    }

    async dropRepository(): Promise<boolean> {
        return this.db.dropEntity(this.entityInfo)
    }

    async clearRepository(): Promise<boolean> {
        return this.db.truncate(this.entityInfo)
    }
}