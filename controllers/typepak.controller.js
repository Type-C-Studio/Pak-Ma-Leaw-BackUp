const db = require("../models");
const Typepak = db.typepak;
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
  const type = {
    name: req.body.name,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tutorial in the database
  Typepak.create(type)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Type.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Typepak.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Type.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Typepak.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Type with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Type with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Typepak.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Typepak.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Type with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Type with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Type with id=${id}. Maybe Type was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Type with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Typepak.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Type was Delete successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Type with id=${id}. Maybe Type was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Type with id=" + id,
      });
    });
};
