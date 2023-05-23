import { Resolver, Mutation, Arg, Query } from "type-graphql";
import User, { UserInput } from "./model";
import Business from "../business/model";
import { roles, businessTypes } from "../config/const.config";
import ServerErrorException from "../exceptions/ServerErrorException";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  @Mutation(() => User)
  async createUser(@Arg("data") input: UserInput): Promise<User> {
    let user: any;
    try {
      // create user
      user = await User.create({
        name: input.name,
        email: input.email,
        phone: input.phone,
        city: input.city,
        role_id: roles.USER,
      });

      // create business
      await Business.create({
        name: input.business_name,
        business_type_id: businessTypes.RESTAURANT,
      });
    } catch (err: any) {
      throw new ServerErrorException(
        err.errors ? err.errors[0].message : "Server error"
      );
    }

    return user;
  }
}
