module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define("products", {
    factories_id: {
      type: Sequelize.INTEGER
    },
  });

  return Products;
};
