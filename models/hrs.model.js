module.exports = (sequelize, Sequelize) => {
  const Hrs = sequelize.define("hrs", {
    name: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    contact: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    education: {
      type: Sequelize.STRING,
    },
    policy: {
      type: Sequelize.STRING,
    },
    salary: {
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.STRING,
    },
    visit: {
      type: Sequelize.STRING,
    },
    train: {
      type: Sequelize.STRING,
    },
    // role_id: {
    //   type: Sequelize.INTEGER,
    // },
  });

  return Hrs;
};
