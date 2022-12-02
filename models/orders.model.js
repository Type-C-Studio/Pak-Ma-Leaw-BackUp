module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define("orders", {
    // customers_id: {
    //   type: Sequelize.INTEGER,
    // },
    // order_ditials_id: {
    //   type: Sequelize.INTEGER,
    // },
  });

  return Orders;
};
