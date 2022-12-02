const db = require("../models");
const { hrs, types } = require("../models/index");
const Vendor = db.vendors;
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
  const vendor = {
    name: req.body.name,
    typeId: req.body.typeId,
    amount: req.body.amount,
    date: req.body.date,
    price: req.body.price,
    hrId: req.body.hrId,
    published: req.body.published ? req.body.published : false,
  };
  // Save Tutorial in the database
  Vendor.create(vendor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vendor.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Vendor.findAll({ include: [types, hrs] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Vendor.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vendor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Vendor with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Vendor with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Vendor.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Vendor.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Vendor with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Vendor with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Vendor with id=${id}. Maybe Vendor was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Vendor with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vendor.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vendor was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Vendor with id=${id}. Maybe Vendor was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Vendor with id=" + id,
      });
    });
};
