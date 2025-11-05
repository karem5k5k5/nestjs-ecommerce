import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminRepository } from "src/models/admin/admin.repository";
import { Admin, adminSchema } from "src/models/admin/admin.schema";
import { UserRepository } from "src/models/common/user.repository";
import { User, userSchema } from "src/models/common/user.schema";
import { CustomerRepository } from "src/models/customer/customer.repository";
import { Customer, customerSchema } from "src/models/customer/customer.schema";
import { SellerRepository } from "src/models/seller/seller.repository";
import { Seller, sellerSchema } from "src/models/seller/seller.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name, schema: userSchema, discriminators: [
                    { name: Customer.name, schema: customerSchema },
                    { name: Seller.name, schema: sellerSchema },
                    { name: Admin.name, schema: adminSchema }
                ]
            }
        ])
    ],
    providers: [CustomerRepository, SellerRepository, UserRepository, AdminRepository],
    exports: [CustomerRepository, SellerRepository, UserRepository, AdminRepository]
})
export class UserMongoModule { }