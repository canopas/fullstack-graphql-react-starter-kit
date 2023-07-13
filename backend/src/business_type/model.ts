import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class BusinessType extends Model {
  @Field()
  public id!: number;
  @Field()
  public type!: string;
}

BusinessType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "business_type",
  },
);

export default BusinessType;
