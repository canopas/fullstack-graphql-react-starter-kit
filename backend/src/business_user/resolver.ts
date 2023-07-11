import { Resolver, Arg, Query, Mutation } from "type-graphql";
import User from "../user/model";
import Business from "../business/model";
import { roles, statusCodes } from "../config/const.config";
import BusinessUser, { BusinessUserInput, LoginInput } from "./model";
import { handleErrors } from "../util/handlers.util";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import BadRequestException from "../exceptions/BadRequestException";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

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

  @Query(() => BusinessUser)
  async businessUser(@Arg("id") id: string): Promise<BusinessUser> {
    return this.findUserByID(id);
  }

  @Mutation(() => Boolean)
  async setBusinessDetails(
    @Arg("businessId") businessId: string,
  ): Promise<boolean> {
    let user: any = await this.findBusinessUser(businessId);
    try {
      // create business user
      await BusinessUser.create({
        name: user.name,
        email: user.email,
        role_id: roles.OWNER,
        business_id: businessId,
        username: user.username,
        password: user.password,
      });
    } catch (error: any) {
      handleErrors(error);
    }

    return true;
  }

  @Mutation(() => BusinessUser)
  async login(@Arg("data") input: LoginInput): Promise<BusinessUser> {
    let user: any = null;
    try {
      const existingUser = await BusinessUser.findOne({
        where: { username: input.username, business_id: input.businessId },
      });

      if (existingUser?.password) {
        existingUser.password =
          existingUser.role_id !== roles.OWNER
            ? bcrypt.hashSync(existingUser.password, process.env.PASSWORD_SALT)
            : existingUser.password;

        user = existingUser.password == input.password ? existingUser : user;
      }
    } catch (error: any) {
      handleErrors(error);
    }

    if (user == null) {
      handleErrors({
        code: statusCodes.UNAUTHORIZED,
        errors: [{ message: "Invalid credentials!!" }],
      });
    }

    return user;
  }

  @Mutation(() => BusinessUser)
  async createBusinessUser(
    @Arg("data") input: BusinessUserInput,
  ): Promise<BusinessUser> {
    if (!input.username || input.username == "") {
      throw new BadRequestException(
        "Username is required!",
        ApolloServerErrorCode.BAD_REQUEST,
      );
    }

    let user: any;
    try {
      // create user
      user = await BusinessUser.create({
        name: input.name,
        email: input.email,
        role_id: input.role_id,
        business_id: input.business_id,
        username: input.username,
        password: input.password,
      });
    } catch (error: any) {
      handleErrors(error);
    }

    return user;
  }

  @Mutation(() => BusinessUser)
  async updateBusinessUser(
    @Arg("id") id: string,
    @Arg("data") input: BusinessUserInput,
  ): Promise<BusinessUser> {
    try {
      // update user
      await BusinessUser.update(
        {
          name: input.name,
          email: input.email,
          username: input.username,
          password: input.password,
          role_id: input.role_id,
        },
        {
          where: { id: id },
        },
      );
    } catch (error: any) {
      handleErrors(error);
    }

    return this.findUserByID(id);
  }

  @Mutation(() => Boolean)
  async deleteBusinessUser(@Arg("id") id: number): Promise<boolean> {
    let count = 0;
    try {
      count = await BusinessUser.destroy({ where: { id } });
    } catch (error: any) {
      handleErrors(error);
    }
    return count > 0;
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

  async findUserByID(id: string): Promise<BusinessUser> {
    let user: any;
    try {
      // find user
      user = await BusinessUser.findOne({
        where: { id: id },
      });
    } catch (error: any) {
      handleErrors(error);
    }

    return user;
  }
}
