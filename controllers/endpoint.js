module.exports = function (app) {
 app.post(pathApi + "/roles" + "/create", (req, res) => {
   const filtro = req.query.filtro;

   return res.status(404).send(false);
 });
 app.get(pathApi + "/roles" + "/", roles.findAll);
 app.get(pathApi + "/roles" + "/:id", roles.findOne);
 app.put(pathApi + "/roles" + "/edit/:id", roles.update);
 app.delete(pathApi + "/roles" + "/delete/:id", roles.delete);


  app.get("/users/:id", (req, res) => {
    const filtro = req.query.filtro;

    return res.status(404).send(false);
  });
};
