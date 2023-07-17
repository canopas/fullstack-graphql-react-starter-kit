import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Category, { CategoryInput } from "./model";
import { handleErrors } from "../util/handlers.util";
import BadRequestException from "../exceptions/BadRequestException";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import NotFoundException from "../exceptions/NotFoundException";

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(@Arg("businessId") businessId: string): Promise<[Category]> {
    let categories: any;
    try {
      categories = await Category.findAll({
        where: { business_id: businessId },
      });
    } catch (error: any) {
      handleErrors(error);
    }
    return categories;
  }

  @Query(() => Category)
  async category(@Arg("id") id: string): Promise<Category> {
    return this.findByID(id);
  }

  @Mutation(() => Category)
  async createCategory(@Arg("data") input: CategoryInput): Promise<Category> {
    if (!input.name || input.business_id == "") {
      throw new BadRequestException(
        "Name and business id are required!",
        ApolloServerErrorCode.BAD_REQUEST,
      );
    }

    let category: any;
    try {
      category = await Category.create({
        name: input.name,
        parent_id: input.parent_id,
        business_id: input.business_id,
      });
    } catch (error: any) {
      handleErrors(error);
    }

    return category;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg("id") id: string,
    @Arg("data") input: CategoryInput,
  ): Promise<Category> {
    try {
      await Category.update(
        {
          name: input.name,
          parent_id: input.parent_id,
          business_id: input.business_id,
        },
        {
          where: { id: id },
        },
      );
    } catch (error: any) {
      handleErrors(error);
    }

    return this.findByID(id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id") id: number): Promise<boolean> {
    let count = 0;
    let categories = await this.findByParentID(id.toString());

    if (categories.length > 0) {
      throw new BadRequestException("Please delete it's subcategories first");
    }

    try {
      count = await Category.destroy({ where: { id } });
    } catch (error: any) {
      handleErrors(error);
    }
    return count > 0;
  }

  async findByID(id: string): Promise<Category> {
    let category: any;
    try {
      category = await Category.findOne({
        where: { id: id },
      });
    } catch (error: any) {
      handleErrors(error);
    }

    if (category == null) {
      throw new NotFoundException("Category not found for given Id");
    }

    return category;
  }

  async findByParentID(id: string): Promise<Category[]> {
    let categories: Category[] = [];
    try {
      categories = await Category.findAll({
        where: { parent_id: id },
      });
    } catch (error: any) {
      handleErrors(error);
    }

    return categories;
  }
}
