'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutorial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tutorial.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tutorial',
  });
  return Tutorial;
};