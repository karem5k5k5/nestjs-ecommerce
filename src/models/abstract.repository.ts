import { Abortable } from "events";
import { Model, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<T> {
    constructor(private readonly model: Model<T>) { }

    public async create(item: Partial<T>) {
        const doc = new this.model(item)
        return await doc.save()
    }

    public async getOne(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: (QueryOptions<T> & Abortable)) {
        return await this.model.findOne(filter, projection, options)
    }

    public async getById(id: string, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return await this.model.findById(id, projection, options)
    }

    public async updateOne(filter: RootFilterQuery<T>, update: UpdateQuery<T>, options?: MongooseUpdateQueryOptions) {
        return await this.model.updateOne(filter, update, options)
    }

}