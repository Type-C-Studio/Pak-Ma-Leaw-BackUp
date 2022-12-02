module.exports = (sequelize, Sequelize) => {
  const Vendor = sequelize.define("vendors", {
    name: {
      type: Sequelize.STRING,
    },
    // type: {
    //   type: Sequelize.INTEGER,
    // },
    amount: {
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    // hr_id: {
    //   type: Sequelize.INTEGER,
    // },
  });

  return Vendor;
};
