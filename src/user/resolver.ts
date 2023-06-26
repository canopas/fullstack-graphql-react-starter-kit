import { Resolver, Mutation, Arg, Query } from "type-graphql";
import User, { UserInput } from "./model";
import Business from "../business/model";
import { roles, businessTypes } from "../config/const.config";
import { Op } from "sequelize";
import BadRequestException from "../exceptions/BadRequestException";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { handleErrors } from "../util/handlers.util";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<[User]> {
    let users: any;
    try {
      // create user
      users = await User.findAll({
        where: { role_id: { [Op.not]: roles.ADMIN } },
        include: {
          model: Business,
          as: "business",
        },
      });
    } catch (error: any) {
      handleErrors(error);
    }

    return users;
  }

  @Query(() => User)
  async user(@Arg("id") id: string): Promise<User> {
    return this.findUserByID(id);
  }

  @Mutation(() => User)
  async createBusinessUser(@Arg("data") input: UserInput): Promise<User> {
    if (!input.business) {
      throw new BadRequestException(
        "Business details are required!",
        ApolloServerErrorCode.BAD_REQUEST
      );
    }

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

      if (input.business) {
        // create business
        await Business.create({
          name: input.business.name,
          business_type_id: businessTypes.RESTAURANT,
          user_id: user.id,
          description: "",
          address: "",
        });
      }
    } catch (error: any) {
      handleErrors(error);
    }

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("data") input: UserInput
  ): Promise<User> {
    try {
      // update user
      await User.update(
        {
          name: input.name,
          email: input.email,
          phone: input.phone,
          city: input.city,
          gender: input.gender,
          username: input.username,
          password: input.password,
          role_id: input.role_id,
        },
        {
          where: { id: id },
        }
      );

      if (input.business) {
        // update business
        await Business.update(
          {
            name: input.business.name,
            description: input.business.description,
            address: input.business.address,
          },
          {
            where: { user_id: id },
          }
        );
      }
    } catch (error: any) {
      handleErrors(error);
    }

    return this.findUserByID(id);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("data") id: Number): Promise<Boolean> {
    let count = 0;
    try {
      count = await User.destroy({ where: { id } });
      await Business.destroy({ where: { user_id: id } });
    } catch (error: any) {
      handleErrors(error);
    }
    return count > 0;
  }

  async findUserByID(id: string): Promise<User> {
    let user: any;
    try {
      // create user
      user = await User.findOne({
        where: { id: id },
        include: {
          model: Business,
          as: "business",
        },
      });
    } catch (error: any) {
      handleErrors(error);
    }

    return user;
  }
}
