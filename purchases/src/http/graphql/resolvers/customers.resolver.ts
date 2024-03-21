import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Customer } from '../models/customer';
import { CustomersService } from 'src/services/customers.service';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { Purchase } from '../models/purchase';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
    constructor(
        private customersService: CustomersService,
        private purchasesService: PurchasesService
    ) { }

    @Query(() => Customer)
    @UseGuards(AuthorizationGuard)
    me(@CurrentUser() user: AuthUser) {
        return this.customersService.geCustomerByAuthUserId(user.sub);
    }

    @ResolveField(() => [Purchase])
    purchases(
        @Parent() customer: Customer
    ) {
        return this.purchasesService.listAllFromCustomer(customer.id)
    }

    @ResolveReference()
    resolveReference(reference: { authUserId: string }) {
        return this.customersService.geCustomerByAuthUserId(reference.authUserId);
    }
}
