'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Artworks',
      'locationId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Locations",
          key: "id"
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Artworks',
        'locationId'
      )
  }
};
