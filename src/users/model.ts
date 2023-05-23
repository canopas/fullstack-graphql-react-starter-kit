import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";
import { Field, ObjectType, InputType } from "type-graphql";
import Business from "../business/model";

@ObjectType()
class User extends Model {
  @Field()
  public id!: number;
  @Field()
  public name!: string;
  @Field()
  public email!: string;
  @Field()
  public phone!: string;
  @Field()
  public city!: string;
  @Field()
  public role_id!: number;
}

@InputType()
export class UserInput {
  @Field()
  name!: string;
  @Field()
  email!: string;
  @Field()
  phone!: string;
  @Field()
  city!: string;
  @Field()
  business_name!: string;
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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.NUMBER,
      defaultValue: 3,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

User.hasOne(Business);

export default User;
