module.exports = (sequelize, Sequelize) => {
  const Materials = sequelize.define("materials", {
    name: {
      type: Sequelize.STRING,
    },
    // type: {
    //   type: Sequelize.INTEGER,
    // },
    date: {
      type: Sequelize.STRING,
    },
    // hr_id: {
    //   type: Sequelize.INTEGER,
    // },
  });

  return Materials;
};
