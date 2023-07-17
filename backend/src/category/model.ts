import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
class Category extends Model {
  @Field()
  public id!: number;
  @Field()
  public name!: string;
  @Field({ nullable: true })
  public parent_id!: number;
  @Field()
  public business_id?: string;
}

@InputType()
export class CategoryInput {
  @Field()
  name!: string;
  @Field()
  parent_id: number;
  @Field()
  business_id!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
    },
    business_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "categories",
  },
);

export default Category;
