module.exports = function(sequelize, DataTypes) {
  let Gesture = sequelize.define("Gesture", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    gestureCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
    {
      // We're saying that we want our Author to have Gestures
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Gesture can't be made
          Gesture.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  Gesture.sync();
  return Gesture;
};
