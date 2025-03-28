"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Post, {
				foreignKey: "userId", // Link to `userId` in Post table
				as: "posts", // Alias for association
				onDelete: "CASCADE", // Ensure posts are deleted if user is deleted
			});
		}
	}
	User.init(
		{
			name: DataTypes.STRING,
			password: DataTypes.STRING,
			phone: DataTypes.STRING,
			zalo: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
