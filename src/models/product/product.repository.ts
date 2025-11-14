import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Product } from "./product.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
        super(productModel)
    }
}   