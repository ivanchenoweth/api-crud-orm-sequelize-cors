'use strict';
// Old way definition
// const {Model} = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   var Tutorial = sequelize.define('Tutorial', {
//     title: DataTypes.STRING,
//     description: DataTypes.STRING,
//     published: DataTypes.BOOLEAN
//   }, {});

//   return Tutorial;
// };


const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutorial extends Model {
    static associate(models) {
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