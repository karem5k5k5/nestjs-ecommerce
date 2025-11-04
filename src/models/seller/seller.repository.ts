import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Seller } from "./seller.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SellerRepository extends AbstractRepository<Seller> {
    constructor(@InjectModel(Seller.name) private sellerModel: Model<Seller>) {
        super(sellerModel)
    }
}