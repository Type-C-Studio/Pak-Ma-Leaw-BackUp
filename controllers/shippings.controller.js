const db = require("../models");
const { hrs } = require("../models");
const Shipping = db.shippings;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.transport) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const shipping = {
    transport: req.body.transport,
    arrived: req.body.arrived,
    order_id: req.body.order_id,
    hrId: req.body.hrId,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tutorial in the database
  Shipping.create(shipping)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Shipping.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Shipping.findAll({ include: [hrs] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Shipping.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Shipping.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Shipping with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Shipping with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Shipping.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Shipping.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Shipping with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Shipping with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Shipping with id=${id}. Maybe Shipping was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Shipping with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Shipping.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Shipping was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Shipping with id=${id}. Maybe Shipping was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Shipping with id=" + id,
      });
    });
};
