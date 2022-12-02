const db = require("../models");
const Assets = db.assets;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.capital) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const asset = {
    capital: req.body.capital,
    income: req.body.income,
    expenditure: req.body.expenditure,
    lucre: req.body.lucre,
    down_at_heel: req.body.down_at_heel,
    date: req.body.date,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tutorial in the database
  Assets.create(asset)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Assets.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Assets.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Assets.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Assets.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Assets with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Assets with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Assets.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Assets.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Assets with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Assets with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Assets with id=${id}. Maybe Assets was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Assets with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Assets.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Assets was Delete successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Assets with id=${id}. Maybe Assets was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Assets with id=" + id,
      });
    });
};
