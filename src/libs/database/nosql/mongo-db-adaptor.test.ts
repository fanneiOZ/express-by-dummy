import {EntityInfo} from "../../domain-driven/interfaces/repository.interface";
import {MongoDbAdaptor} from "./mongo-db-adaptor";

const mockedMongoClient = {
    db: jest.fn((): any => mockedDb),
    isConnected: jest.fn(),
}

const mockedDb = {
    collection: () => jest.fn(),
}

jest.mock('mongodb', () => {
    return {
        __esModule: true,
        MongoClient: jest.fn(() => mockedMongoClient),
        Db: jest.fn(() => mockedDb),
    }
})

beforeEach(() => {
    jest.clearAllMocks()
})

describe('Mongo adaptor', () => {
    test('create', () => {
        const instance = MongoDbAdaptor.getInstance()

        expect(instance).toBeInstanceOf(MongoDbAdaptor)
    })

    describe('Create entity', () => {
        const instance = MongoDbAdaptor.getInstance()

        test('Truthy when successfully resolved', async () => {
            const entity: EntityInfo = {
                dbName: 'testDb',
                schemaName: 'testSchema',
                tableName: 'testName',
                schemaDefinitions: [],
            }

            jest.spyOn(mockedMongoClient, 'isConnected').mockResolvedValue(true)
            jest.spyOn(mockedDb, 'collection')
            jest.spyOn(mockedMongoClient, 'db')

            const result = await instance.createEntity(entity)

            expect(result).toBeTruthy()
            expect(mockedMongoClient.db).toHaveBeenCalledTimes(1)
            expect(mockedDb.collection).toHaveBeenCalledTimes(1)
        })

        test('Falsy when failed to resolve db', async () => {
            const entity: EntityInfo = {
                dbName: 'testDb',
                schemaName: 'testSchema',
                tableName: 'testName',
                schemaDefinitions: [],
            }

            jest.spyOn(mockedMongoClient, 'isConnected').mockResolvedValue(true)
            jest.spyOn(mockedMongoClient, 'db')
            jest.spyOn(mockedDb, 'collection').mockImplementation(() => {
                throw new Error('test')
            })

            const result = await instance.createEntity(entity)

            expect(result).toBeFalsy()
        })
    })
})