const db = require("../models");
const { typepak } = require("../models/index");
const Factories = db.factories;
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
  const factories = {
    name: req.body.name,
    pit: req.body.pit,
    row: req.body.row,
    leg: req.body.leg,
    typepakId: req.body.typepakId,
    timeplant: req.body.timeplant,
    finishplant: req.body.finishplant,
    intendant: req.body.intendant,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tutorial in the database
  Factories.create(factories)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the factories.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Factories.findAll({ include: [typepak] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving factories.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Factories.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find factories with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving factories with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Factories.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Factories.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find factories with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving factories with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update factories with id=${id}. Maybe factories was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating factories with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Factories.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "factories was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete factories with id=${id}. Maybe factories was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete factories with id=" + id,
      });
    });
};
