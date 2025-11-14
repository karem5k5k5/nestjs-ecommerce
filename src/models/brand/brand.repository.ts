import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";    
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Brand } from "./brand.schema";

@Injectable()
export class BrandRepository extends AbstractRepository<Brand> {
    constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {
        super(brandModel)
    }
}