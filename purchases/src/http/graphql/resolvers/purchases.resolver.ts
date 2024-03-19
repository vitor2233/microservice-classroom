import { BadRequestException, UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent, Mutation, Args } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Purchase } from '../models/purchase';
import { PurchasesService } from 'src/services/purchases.service';
import { Product } from '../models/product';
import { ProductsService } from 'src/services/products.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
    constructor(
        private purchasesService: PurchasesService,
        private productsService: ProductsService,
        private customersService: CustomersService,
    ) { }

    @Query(() => [Purchase])
    @UseGuards(AuthorizationGuard)
    purchases() {
        return this.purchasesService.listAllPurchases();
    }

    @ResolveField(() => Product)
    product(
        @Parent() purchase: Purchase
    ) {
        return this.productsService.getProductById(purchase.productId)
    }

    @Mutation(() => Purchase)
    @UseGuards(AuthorizationGuard)
    async createPurchase(
        @Args('data') data: CreatePurchaseInput,
        @CurrentUser() user: AuthUser
    ) {
        let customer = await this.customersService.geCustomerByAuthUserId(user.sub);

        if (!customer) {
            customer = await this.customersService.createCustomer({ authUserId: user.sub })
        }

        return this.purchasesService.createPurchase(
            { productId: data.productId, customerId: customer.id }
        );
    }
}
