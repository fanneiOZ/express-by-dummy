import {injectable} from "tsyringe";
import {MongoDbAdaptor} from "../../../libs/database/nosql/mongo-db-adaptor";
import {DocumentRepository} from "../../../libs/domain-driven/document-repository";
import {Product, ProductInterface} from "../models/product";

@injectable()
export class ProductRepository extends DocumentRepository<ProductInterface> {
    constructor() {
        super(
            MongoDbAdaptor.getInstance(),
            {
                dbName: 'sandbox',
                schemaName: 'schema',
                tableName: 'product',
                schemaDefinitions: []
            }
        )
    }

    createPersistence(writable: Product): unknown {
        return writable.toJSON()
    }

    createWritable(document: ProductInterface): Product {
        return new Product(document)
    }
}