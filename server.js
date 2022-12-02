require("dotenv").config();

const express = require("express"),
  fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger");

const db = require("./models");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc/swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/doc/swagger.css", "utf8");

const customers = require("./controllers/customers.controller");
const hrs = require("./controllers/hrs.controller");
const factories = require("./controllers/factories.controller");
const products = require("./controllers/products.controller");
const order_details = require("./controllers/order_details.controller");
const orders = require("./controllers/orders.controller");
const shippings = require("./controllers/shippings.controller");
const vendors = require("./controllers/vendors.controller");
const packings = require("./controllers/packings.controller");
const materials = require("./controllers/materials.controller");
const assets = require("./controllers/assets.controller");
const roles = require("./controllers/roles.controller");
const types = require("./controllers/types.controller");
const staff = require("./controllers/staff.controller");
const user = require("./controllers/user.controller");
const typepak = require("./controllers/typepak.controller");
const loginusers = require("./controllers/userlogin.controller");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const pathApi = "/api";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(logger.requestLogger);

db.sequelize
  .sync() //{ force: true } reset database on save
  .then(() => {
    console.log("Synced db.");
    console.log("Ready for Rock !! 👾 🤖");
    console.log(`Pak Server started... port ${PORT}`);
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// testing api
app.get(pathApi + "/", (req, res) => {
  res.json("Hello World form server pak");
});
// let express to use this
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);

// role api
{
  app.post(pathApi + "/roles" + "/create", roles.create);
  app.get(pathApi + "/roles" + "/", roles.findAll);
  app.get(pathApi + "/roles" + "/:id", roles.findOne);
  app.put(pathApi + "/roles" + "/edit/:id", roles.update);
  app.delete(pathApi + "/roles" + "/delete/:id", roles.delete);
}
// customer api
{
  app.post(pathApi + "/customers" + "/create", customers.create);
  app.get(pathApi + "/customers" + "/", customers.findAll);
  app.get(pathApi + "/customers" + "/:id", customers.findOne);
  app.put(pathApi + "/customers" + "/edit/:id", customers.update);
  app.delete(pathApi + "/customers" + "/delete/:id", customers.delete);
}

// hrs api
{
  app.post(pathApi + "/hrs" + "/create", hrs.create);
  app.get(pathApi + "/hrs" + "/", hrs.findAll);
  app.get(pathApi + "/hrs" + "/:id", hrs.findOne);
  app.put(pathApi + "/hrs" + "/edit/:id", hrs.update);
  app.delete(pathApi + "/hrs" + "/delete/:id", hrs.delete);
}
// fatories api
{
  app.post(pathApi + "/factories" + "/create", factories.create);
  app.get(pathApi + "/factories" + "/", factories.findAll);
  app.get(pathApi + "/factories" + "/:id", factories.findOne);
  app.put(pathApi + "/factories" + "/edit/:id", factories.update);
  app.delete(pathApi + "/factories" + "/delete/:id", factories.delete);
}
// products api
{
  app.post(pathApi + "/products" + "/create", products.create);
  app.get(pathApi + "/products" + "/", products.findAll);
  app.get(pathApi + "/products" + "/:id", products.findOne);
  app.put(pathApi + "/products" + "/edit/:id", products.update);
  app.delete(pathApi + "/products" + "/delete/:id", products.delete);
}
// Order_details api
{
  app.post(pathApi + "/orderdetails" + "/create", order_details.create);
  app.get(pathApi + "/orderdetails" + "/", order_details.findAll);
  app.get(pathApi + "/orderdetails" + "/:id", order_details.findOne);
  app.put(pathApi + "/orderdetails" + "/edit/:id", order_details.update);
  app.delete(pathApi + "/orderdetails" + "/delete/:id", order_details.delete);
}
// Order
{
  app.post(pathApi + "/order" + "/create", orders.create);
  app.get(pathApi + "/order" + "/", orders.findAll);
  app.get(pathApi + "/order" + "/:id", orders.findOne);
  app.put(pathApi + "/order" + "/edit/:id", orders.update);
  app.delete(pathApi + "/order" + "/delete/:id", orders.delete);
}
// shipping api
{
  app.post(pathApi + "/shipping" + "/create", shippings.create);
  app.get(pathApi + "/shipping" + "/", shippings.findAll);
  app.get(pathApi + "/shipping" + "/:id", shippings.findOne);
  app.put(pathApi + "/shipping" + "/edit/:id", shippings.update);
  app.delete(pathApi + "/shipping" + "/delete/:id", shippings.delete);
}
// vondor api
{
  app.post(pathApi + "/vondors" + "/create", vendors.create);
  app.get(pathApi + "/vondors" + "/", vendors.findAll);
  app.get(pathApi + "/vondors" + "/:id", vendors.findOne);
  app.put(pathApi + "/vondors" + "/edit/:id", vendors.update);
  app.delete(pathApi + "/vondors" + "/delete/:id", vendors.delete);
}
// packing api
{
  app.post(pathApi + "/packings" + "/create", packings.create);
  app.get(pathApi + "/packings" + "/", packings.findAll);
  app.get(pathApi + "/packings" + "/:id", packings.findOne);
  app.put(pathApi + "/packings" + "/edit/:id", packings.update);
  app.delete(pathApi + "/packings" + "/delete/:id", packings.delete);
}
// materials api
{
  app.post(pathApi + "/materials" + "/create", materials.create);
  app.get(pathApi + "/materials" + "/", materials.findAll);
  app.get(pathApi + "/materials" + "/:id", materials.findOne);
  app.put(pathApi + "/materials" + "/edit/:id", materials.update);
  app.delete(pathApi + "/materials" + "/delete/:id", materials.delete);
}
// asset api
{
  app.post(pathApi + "/assets" + "/create", assets.create);
  app.get(pathApi + "/assets" + "/", assets.findAll);
  app.get(pathApi + "/assets" + "/:id", assets.findOne);
  app.put(pathApi + "/assets" + "/edit/:id", assets.update);
  app.delete(pathApi + "/assets" + "/delete/:id", assets.delete);
}
// type api
{
  app.post(pathApi + "/types" + "/create", types.create);
  app.get(pathApi + "/types" + "/", types.findAll);
  app.get(pathApi + "/types" + "/:id", types.findOne);
  app.put(pathApi + "/types" + "/edit/:id", types.update);
  app.delete(pathApi + "/types" + "/delete/:id", types.delete);
}
// typepak api
{
  app.post(pathApi + "/typepak" + "/create", typepak.create);
  app.get(pathApi + "/typepak" + "/", typepak.findAll);
  app.get(pathApi + "/typepak" + "/:id", typepak.findOne);
  app.put(pathApi + "/typepak" + "/edit/:id", typepak.update);
  app.delete(pathApi + "/typepak" + "/delete/:id", typepak.delete);
}

// staff api
{
  app.post(pathApi + "/staffs" + "/create", staff.create);
  app.get(pathApi + "/staffs" + "/", staff.findAll);
  app.get(pathApi + "/staffs" + "/:id", staff.findOne);
  app.put(pathApi + "/staffs" + "/edit/:id", staff.update);
  app.delete(pathApi + "/staffs" + "/delete/:id", staff.delete);
}

{
  app.post(pathApi + "/login", user.login);
}
{
  app.post(pathApi + "/users/login", loginusers.login);
}

// Run the server
app.listen(PORT, () => {
  console.log(`Pak Server started... port ${PORT}`);
});
