module.exports = (sequelize, Sequelize) => {
  const Order_details = sequelize.define("order_details", {
    name: {
      type: Sequelize.STRING,
    },
    package: {
      type: Sequelize.STRING,
    },
    pak: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });

  return Order_details;
};
