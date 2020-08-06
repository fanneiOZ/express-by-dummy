import {container} from "tsyringe";
import {EntityInfo} from "../../domain-driven/interfaces/repository.interface";
import {DbAdaptorAbstract} from "../db-adaptor.abstract";
import {Collection, MongoClient} from 'mongodb';

export class MongoDbAdaptor extends DbAdaptorAbstract {
    private static instance: MongoDbAdaptor

    static getInstance(): MongoDbAdaptor {
        if (!this.instance) {
            const db = process.env.MONGO_URL ?? 'mongodb://localhost:27017'
            const client = new MongoClient(db)

            this.instance = new MongoDbAdaptor(client)
        }

        return this.instance
    }

    private constructor(

        private client: MongoClient
    ) {
        super()
    }

    async createEntity(schema: EntityInfo): Promise<boolean> {
        try {
            await this.setupConnection()
            await this.resolveCollection(schema)

            return true
        } catch (e) {
            return false
        }
    }

    async delete<T>(query: T): Promise<void> {
        return Promise.resolve(undefined);
    }

    async dropEntity(schema: EntityInfo): Promise<boolean> {
        try {
            await this.setupConnection()
            await this.resolveCollection(schema).drop()

            return true
        } catch (e) {
            return false
        }
    }

    async insert<T>(schema: EntityInfo, data: T): Promise<T> {
        try {
            await this.setupConnection()
            await this.resolveCollection(schema).insertOne(data)
        } catch (e) {
            throw e
        }
        return data;
    }

    async select<T, K>(query: K): Promise<T> {
        return Promise.resolve(undefined);
    }

    async truncate(schema: EntityInfo): Promise<boolean> {
        return Promise.resolve(false);
    }

    async update<T, K>(data: T, query?: K): Promise<void> {
        return Promise.resolve(undefined);
    }

    private async setupConnection(): Promise<void> {
        if (!this.client.isConnected()) {
            await this.client.connect()
        }
    }

    private resolveCollection(entity: EntityInfo): Collection {
        const collection  = `${entity.schemaName}-${entity.tableName}`

        return this.client.db(entity.dbName).collection(collection)
    }
}