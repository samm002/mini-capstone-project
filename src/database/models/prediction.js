'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Prediction extends Model {
    static associate(models) {
      Prediction.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

      Prediction.hasOne(models.NutritionDetail, {
        foreignKey: 'prediction_id',
        as: 'nutrition_detail',
      });
    }
  }
  Prediction.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      nutrition_detail_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'nutrition_detail_id',
        references: {
          model: 'nutrition_details',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Prediction',
      tableName: 'predictions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
    }
  );
  return Prediction;
};
