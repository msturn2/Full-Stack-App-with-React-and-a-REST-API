"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A first name is required"
          },
          notEmpty: {
            msg: "Please enter the user's First Name"
          },
        },
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A last name is required"
          },
          notEmpty: {
            msg: "Please enter the user's Last Name"
          },
        },
      },

      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email you entered already exists"
        },
        validate: {
          notNull: {
            msg: "An email is required"
          },
          isEmail: {
            msg: "Please provide a valid email address"
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A password is required"
          },
          notEmpty: {
            msg: "Please provide a password"
          },
        },
      },

      confirmPassword: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          customValidator(val) {
            if (val !== this.password) {
              console.log(this.password);
              throw new Error(`The passwords do not match`);
            } else {
              return null;
            }
          },
          notNull: {
            msg: "Please Confirm Password",
          },
          notEmpty: {
            msg: "Please Confirm Password",
          },
        },
      },
    },
    {
      // options
      sequelize,
      modelName: "User",
      hooks: {
        afterValidate: function(user) {
          if (
            user.password 
            === user.confirmPassword
          ) {
            console.log("theres matching");
            const salt = bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(
              user.password, 
              salt
            );
          }
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: "userInfo",
      foreignKey: {
        fieldName: "userId",
      },
    });
  };
  return User;
};