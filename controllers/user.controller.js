const db = require("../models");
const jwt = require("jsonwebtoken");
const hrs = db.hrs;

const JWT_SERECT = "66fsOJyT5s5AvDkNFak191dhAlxn9Ch";

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const Hrs = await hrs.findOne({
    where: { email: email },
  });

  if (!Hrs || !(password === Hrs.password)) {
    res.status(203).send({
      message: "Incorrect Username or Password.",
    });
    return;
  }

  const token = jwt.sign(
    {
      email: hrs.email,
      name: hrs.name,
    },
    JWT_SERECT
  );

  res.status(200).send({
    token: token,
  });
};
