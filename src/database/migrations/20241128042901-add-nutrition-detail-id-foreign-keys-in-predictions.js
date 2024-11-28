'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('predictions', 'nutrition_detail_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'nutrition_details',
        key: 'id',
      },
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('predictions', 'nutrition_detail_id');
  },
};
