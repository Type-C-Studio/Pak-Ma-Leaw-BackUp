module.exports = (sequelize, Sequelize) => {
  const Shipping = sequelize.define("shippings", {
    transport : {
      type: Sequelize.STRING
    },
    arrived: {
      type:Sequelize.STRING
    },
    order_id: {
      type:Sequelize.INTEGER
    },
    // hr_id: {
    //   type:Sequelize.INTEGER
    // }
  });

  return Shipping;
};
