"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {}
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter the course's Title"
          },
          notEmpty: {
            msg: "Please enter the course's Title"
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter a course descripton"
          },
          notEmpty: {
            msg: "Please enter a course descripton"
          },
        },
      },
      estimatedTime: {
        type: DataTypes.STRING,
      },
      materialsNeeded: {
        type: DataTypes.STRING,
      },
    },
    { 
      // options
      sequelize,
      modelName: "Course" 
    }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: "userInfo",
      foreignKey: {
        fieldName: "userId"
      },
    });
  };
  return Course;
};
