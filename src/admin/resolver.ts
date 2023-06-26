import { Resolver, Mutation, Arg, Query } from "type-graphql";
import Admin, { AdminInput } from "./model";
import { roles } from "../config/const.config";
import { handleErrors } from "../util/handlers.util";

@Resolver(() => Admin)
export class AdminResolver {
  @Mutation(() => Admin)
  async createAdmin(@Arg("data") input: AdminInput): Promise<Admin> {
    let admin: any;
    try {
      // create admin
      admin = await Admin.create({
        name: input.name,
        email: input.email,
        password: input.password,
        role_id: roles.ADMIN,
      });
    } catch (error: any) {
      handleErrors(error);
    }
    return admin;
  }

  @Mutation(() => Admin)
  async adminLogin(@Arg("data") input: AdminInput): Promise<Admin> {
    let admin: any = { email: "" };
    try {
      const existingUser = await Admin.findOne({
        where: { email: input.email },
      });
      if (existingUser != null && existingUser.password == input.password) {
        admin = existingUser;
      }
    } catch (error: any) {
      handleErrors(error);
    }
    return admin;
  }
}
