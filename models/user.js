module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
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
  },{
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Gesture, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return User;
};
