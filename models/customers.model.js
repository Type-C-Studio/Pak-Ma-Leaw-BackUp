module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define("customers", {
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
    line: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    favorite: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
  });

  return Customers;
};
