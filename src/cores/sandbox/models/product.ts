import {Identifier, Writable} from "../../../libs/domain-driven/interfaces/repository.interface";

export interface ProductInterface {
    key: Identifier
    name: string
}

export class Product extends Writable<ProductInterface> {
    constructor(protected data: ProductInterface) {
        super()
    }

    getName(): string {
        return this.data.name
    }

    toJSON(): ProductInterface {
        return {
            key: this.key,
            name: this.data.name
        }
    }
}