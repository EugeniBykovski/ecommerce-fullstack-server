'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoilerParts extends Model {
    static associate(models) {}
  }
  BoilerParts.init(
    {
      boiler_manufacturer: DataTypes.STRING,
      price: DataTypes.INTEGER,
      parts_manufacturer: DataTypes.STRING,
      vendor_code: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      images: DataTypes.STRING,
      in_stock: DataTypes.STRING,
      bestsellers: DataTypes.BOOLEAN,
      new: DataTypes.BOOLEAN,
      popularity: DataTypes.INTEGER,
      compatibility: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'BoilerParts',
    },
  );
  return BoilerParts;
};
