import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Business extends Model {
  @Field()
  public id!: number;
  @Field()
  public name!: string;
  @Field()
  public business_type_id!: number;
}

Business.init(
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
    business_type_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "business_details",
  }
);

export default Business;
