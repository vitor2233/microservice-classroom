import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

export interface CreateCustomerParams {
    authUserId: string;
}

@Injectable()
export class CustomersService {
    constructor(
        private prisma: PrismaService
    ) { }
    geCustomerByAuthUserId(authUserId: string) {
        return this.prisma.customer.findUnique({
            where: {
                authUserId
            }
        })
    }

    async createCustomer({ authUserId }: CreateCustomerParams) {
        return this.prisma.customer.create({
            data: {
                authUserId
            }
        })
    }
}