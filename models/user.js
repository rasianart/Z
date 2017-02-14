module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    name: DataTypes.STRING,
    loginimg: DataTypes.TEXT,
    userimg: DataTypes.TEXT,
    burrowcode: DataTypes.TEXT,
    riddle: DataTypes.TEXT,
    answer: DataTypes.STRING,
    info: DataTypes.TEXT,
    link: DataTypes.TEXT,
    color: DataTypes.STRING,
    burrow1: DataTypes.STRING,
    burrow2: DataTypes.STRING,
    burrow3: DataTypes.STRING,
    burrow4: DataTypes.STRING,
    burrow5: DataTypes.STRING
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
