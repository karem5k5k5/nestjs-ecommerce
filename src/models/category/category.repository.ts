import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Category } from "./category.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {
        super(categoryModel)
    }
}