module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    name: DataTypes.STRING
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our User to have Posts
      classMethods: {
        associate: function(models) {
          // Associating User with Posts
          // When an User is deleted, also delete any associated Posts
          User.hasMany(models.Gesture, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  // User.sync();
  return User;
};
