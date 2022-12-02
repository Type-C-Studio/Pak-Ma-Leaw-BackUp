const db = require("../models");
const Order_details = db.order_details;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const order_details = {
    name: req.body.name,
    package: req.body.package,
    pak: req.body.pak,
    price: req.body.price,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tutorial in the database
  Order_details.create(order_details)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Order_details.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Order_details.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order_details.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order_details.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Order_details with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Order_details with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order_details.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Order_details.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Order_details with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Order_details with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Order_details with id=${id}. Maybe Order_details was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order_details with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order_details.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order_details was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order_details with id=${id}. Maybe Order_details was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order_details with id=" + id,
      });
    });
};
