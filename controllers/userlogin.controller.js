const db = require("../models");
const jwt = require("jsonwebtoken");
const users = db.customers;

const JWT_SERECT = "99fsOJyT5s5AvOrNGak917dhAlxn1Ch";

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const Users = await users.findOne({
    where: { email: email },
  });

  if (!Users || !(password === Users.password)) {
    res.status(203).send({
      message: "Incorrect Username or Password.",
    });
    return;
  }

  const token = jwt.sign(
    {
      email: users.email,
      name: users.name,
    },
    JWT_SERECT
  );

  res.status(200).send({
    token: token,
  });
};
