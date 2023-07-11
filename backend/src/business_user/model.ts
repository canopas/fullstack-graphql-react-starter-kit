import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";
import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
class BusinessUser extends Model {
  @Field()
  public id!: number;
  @Field({ nullable: true })
  public name?: string;
  @Field()
  public email!: string;
  @Field({ nullable: true })
  public business_id?: string;
  @Field({ nullable: true })
  public role_id?: number;
  @Field({ nullable: true })
  public username?: string;
  @Field({ nullable: true })
  public password?: string;
}

@InputType()
export class LoginInput {
  @Field()
  username!: string;
  @Field()
  businessId!: string;
  @Field()
  password!: string;
}

@InputType()
export class BusinessUserInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  role_id?: number;
  @Field({ nullable: true })
  business_id?: string;
  @Field({ nullable: true })
  username?: string;
  @Field({ nullable: true })
  password?: string;
}

BusinessUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.NUMBER,
      defaultValue: 3,
    },
    business_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "business_users",
  },
);

export default BusinessUser;
