require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // นี่เป็นชื่อ DB ของเราน
  process.env.DB_USER, // user ที่ใช้สรการเข้าไปยัง db
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST, // host ของ db ที่เราสร้างเอาไว้
    dialect: "postgres", // 'mysql' | 'mariadb' | 'postgres' | 'mssql'   พวกนี้ใช่ก็ใช้ได้นะจ๊ะ
    define: {
      timestamps: false, //ส่วนตรงนี้ก็เป็นการตั้งค่าเพิ่มเติม
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("./roles.model.js")(sequelize, Sequelize);
db.customers = require("./customers.model")(sequelize, Sequelize);
db.hrs = require("./hrs.model")(sequelize, Sequelize);
db.factories = require("./factories.model")(sequelize, Sequelize);
db.products = require("./products.model")(sequelize, Sequelize);
db.order_details = require("./order_details.model")(sequelize, Sequelize);
db.orders = require("./orders.model")(sequelize, Sequelize);
db.shippings = require("./shippings.model")(sequelize, Sequelize);
db.vendors = require("./vendor.model")(sequelize, Sequelize);
db.packings = require("./packings.model")(sequelize, Sequelize);
db.materials = require("./materials.model")(sequelize, Sequelize);
db.assets = require("./assets.model")(sequelize, Sequelize);
db.types = require("./types.model")(sequelize, Sequelize);
db.typepak = require("./typepak.model")(sequelize, Sequelize);

// db.role.hasOne(db.hrs, {
//   foreignKey: { name: "role_id", field: "role_id" },
// });

db.role.hasOne(db.hrs);
db.hrs.belongsTo(db.role);

db.types.hasOne(db.materials);
db.materials.belongsTo(db.types);
db.hrs.hasOne(db.materials);
db.materials.belongsTo(db.hrs);

db.types.hasOne(db.vendors);
db.vendors.belongsTo(db.types);
db.hrs.hasOne(db.vendors);
db.vendors.belongsTo(db.hrs);

db.hrs.hasOne(db.shippings);
db.shippings.belongsTo(db.hrs);

db.typepak.hasOne(db.factories);
db.factories.belongsTo(db.typepak);

db.order_details.hasOne(db.orders);
db.orders.belongsTo(db.order_details);
db.customers.hasOne(db.orders);
db.orders.belongsTo(db.customers);

module.exports = db;

// ส่วนนี้เป็นการตั้งต่า relation โดยเป็นการบอกว่าใน 1 team มีได้หลาย player ง่ายๆ ก็คือ relation แบบ 1:M
//   db.team.hasMany(
//     db.player,
//     {
//         foreignKey: { name: 'tid', field: 'tid' }, //name ตรงสำคัญพยายามตั่งให้เป็นชื่อเดียวกับ FK ใน table ที่นำไปใช้นะครับ
//     }
//   };

// ส่วนนี้เป็นการตั้ง relation แบบกลับกันกับด้านบน จริงแล้วเราไม่ตั้งก็ได้แต่แนะนำให้ตั้งเอาไว้ เพราะเวลาที่เราไม่ได้ใส่
// line นี้จะทำให้เราสามารถใช้  team ในการหา player ได้อย่างเดียวและไม่สามารถใช้ player หา team ได้
//   db.player.belongsTo(db.team, { foreignKey: 'tid' });
