'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nutrition_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      prediction_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'prediction_id',
        references: {
          model: 'predictions',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      calcium: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      calories: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      carbohydrate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cholesterol: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fiber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      iron: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      monounsaturated_fat: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'monounsaturated_fat',
      },
      polyunsaturated_fat: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'polyunsaturated_fat',
      },
      potassium: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      protein: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      saturated_fat: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'saturated_fat',
      },
      sodium: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sugar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vitamin_a: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'vitamin_a',
      },
      vitamin_c: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'vitamin_c',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nutrition_details');
  },
};
