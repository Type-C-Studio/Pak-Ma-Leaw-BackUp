module.exports = (sequelize, Sequelize) => {
  const Assets = sequelize.define("assets", {
    capital: {
      type: Sequelize.INTEGER,
    },
    income: {
      type: Sequelize.INTEGER
    },
    expenditure: {
      type: Sequelize.INTEGER
    },
    lucre: {
      type:Sequelize.INTEGER
    },
    down_at_heel: {
      type: Sequelize.INTEGER
    },
    date: {
      type: Sequelize.STRING
    }
  });

  return Assets;
};
