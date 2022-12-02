module.exports = (sequelize, Sequelize) => {
  const Packings = sequelize.define("packings", {
    transport: {
      type: Sequelize.STRING,
    },
    arrived: {
      type: Sequelize.STRING,
    },
  });

  return Packings;
};
