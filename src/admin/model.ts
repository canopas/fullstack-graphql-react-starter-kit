import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";
import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
class Admin extends Model {
  @Field()
  public id!: number;
  @Field({ nullable: true })
  public name?: string;
  @Field()
  public email!: string;
  @Field({ nullable: true })
  public role_id?: number;
  @Field({ nullable: true })
  public password?: string;
}

@InputType()
export class AdminInput {
  @Field({ nullable: true })
  name?: string;
  @Field()
  email!: string;
  @Field({ nullable: true })
  password!: string;
}

Admin.init(
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

export default Admin;
