module.exports = (sequelize, Sequelize) => {
  const Typepak = sequelize.define("typepak", {
    name: {
      type: Sequelize.STRING,
    },
  });

  return Typepak;
};
