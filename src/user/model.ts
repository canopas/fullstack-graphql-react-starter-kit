import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";
import { Field, ObjectType, InputType } from "type-graphql";
import Business from "../business/model";

@ObjectType()
class User extends Model {
  @Field()
  public id!: number;
  @Field({ nullable: true })
  public name?: string;
  @Field()
  public email!: string;
  @Field({ nullable: true })
  public phone?: string;
  @Field({ nullable: true })
  public city?: string;
  @Field({ nullable: true })
  public gender?: number;
  @Field({ nullable: true })
  public role_id?: number;
  @Field({ nullable: true })
  public username?: string;
  @Field({ nullable: true })
  public password?: string;
  @Field({ nullable: true })
  public business?: Business;
}

@InputType()
export class BusinessInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  address?: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  business_type_id?: number;
  @Field({ nullable: true })
  user_id?: number;
  @Field({ nullable: true })
  status?: number;
}

@InputType()
export class UserInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  phone?: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  gender?: number;
  @Field({ nullable: true })
  role_id?: number;
  @Field({ nullable: true })
  username?: string;
  @Field({ nullable: true })
  password?: string;
  @Field({ nullable: true })
  business?: BusinessInput;
}

User.init(
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
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    role_id: {
      type: DataTypes.NUMBER,
      defaultValue: 3,
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
    modelName: "users",
  }
);

User.hasOne(Business, { foreignKey: "user_id", as: "business" });

export default User;
