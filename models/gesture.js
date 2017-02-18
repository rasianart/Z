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
  },{
      classMethods: {
        associate: function(models) {
          Gesture.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Gesture;
};
