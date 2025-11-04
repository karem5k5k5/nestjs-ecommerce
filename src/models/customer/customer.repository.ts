import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Customer } from "./customer.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerRepository extends AbstractRepository<Customer> {
    constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {
        super(customerModel)
    }
}