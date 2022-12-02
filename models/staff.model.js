module.exports = (sequelize, Sequelize) => {
  const Staff = sequelize.define("staffs", {
    name: {
      type: Sequelize.STRING,
    },
  });

  return Staff;
};
