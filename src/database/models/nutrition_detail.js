'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NutritionDetail extends Model {
    static associate(models) {
      NutritionDetail.belongsTo(models.Prediction, {
        foreignKey: 'prediction_id',
        as: 'prediction',
      });
    }
  }
  NutritionDetail.init(
    {
      prediction_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'prediction_id',
        references: {
          model: 'predictions',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      calcium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      calories: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      carbohydrate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cholesterol: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fiber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      iron: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monounsaturated_fat: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'monounsaturated_fat',
      },
      polyunsaturated_fat: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'polyunsaturated_fat',
      },
      potassium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      protein: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      saturated_fat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sodium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sugar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vitamin_a: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'vitamin_a',
      },
      vitamin_c: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'vitamin_c',
      },
    },
    {
      sequelize,
      modelName: 'NutritionDetail',
      tableName: 'nutrition_details',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
    }
  );
  return NutritionDetail;
};
