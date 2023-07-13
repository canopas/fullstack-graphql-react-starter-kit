import { Resolver, Query } from "type-graphql";
import { handleErrors } from "../util/handlers.util";
import BusinessType from "./model";

@Resolver(() => BusinessType)
export class BusinessTypeResolver {
  @Query(() => [BusinessType])
  async businessTypes(): Promise<[BusinessType]> {
    let businessTypes: any;
    try {
      businessTypes = await BusinessType.findAll();
    } catch (error: any) {
      handleErrors(error);
    }

    return businessTypes;
  }
}
