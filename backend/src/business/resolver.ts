import { Resolver, Arg, Query, Mutation } from "type-graphql";
import Business, { BusinessInput } from "../business/model";
import { handleErrors } from "../util/handlers.util";
import NotFoundException from "../exceptions/NotFoundException";

@Resolver(() => Business)
export class BusinessResolver {
  @Query(() => Business)
  async businessDetails(
    @Arg("businessId") businessId: string,
  ): Promise<Business> {
    return this.findBusinessById(businessId);
  }

  @Mutation(() => Business)
  async updateBusinessDetails(
    @Arg("businessId") businessId: string,
    @Arg("data") input: BusinessInput,
  ): Promise<Business | null> {
    try {
      // update user
      await Business.update(
        {
          name: input.name,
          description: input.description,
          address: input.address,
          city: input.city,
          business_type_id: input.business_type_id,
        },
        {
          where: { link_id: businessId },
        },
      );
    } catch (error: any) {
      handleErrors(error);
    }

    return this.findBusinessById(businessId);
  }

  async findBusinessById(businessId: string): Promise<Business> {
    let business: any;
    try {
      business = await Business.findOne({
        where: { link_id: businessId },
      });
    } catch (error: any) {
      handleErrors(error);
    }

    if (business == null) {
      throw new NotFoundException();
    }

    return business;
  }
}
