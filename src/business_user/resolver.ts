import { Resolver, Arg, Query, Mutation } from "type-graphql";
import User from "../user/model";
import Business from "../business/model";
import { roles } from "../config/const.config";
import BusinessUser from "./model";
import { handleErrors } from "../util/handlers.util";

@Resolver(() => BusinessUser)
export class BusinessUserResolver {
  @Query(() => [BusinessUser])
  async businessUsers(
    @Arg("businessId") businessId: string,
  ): Promise<[BusinessUser]> {
    let users: any;
    try {
      // get admins
      users = await BusinessUser.findAll({
        where: { business_id: businessId },
      });
    } catch (error: any) {
      handleErrors(error);
    }
    return users;
  }

  @Mutation(() => Boolean)
  async setBusinessDetails(
    @Arg("businessId") businessId: string,
  ): Promise<Boolean> {
    let user: any = await this.findBusinessUser(businessId);
    try {
      // create business user
      await BusinessUser.create({
        name: user.name,
        email: user.email,
        role_id: roles.ADMIN,
        business_id: businessId,
        username: user.business.username,
        password: user.business.password,
      });
    } catch (error: any) {
      handleErrors(error);
    }

    return true;
  }

  async findBusinessUser(businessId: string): Promise<User> {
    let user: any;
    try {
      user = await User.findOne({
        include: {
          model: Business,
          as: "business",
          where: { link_id: businessId },
        },
      });
    } catch (error: any) {
      handleErrors(error);
    }

    return user;
  }
}
