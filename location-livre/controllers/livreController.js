const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM livres", (err, role) => {
      if (err) {
        res.json(err);
      }
      res.render("index", {
        data: livres
      });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body);

  req.check("titre").isLength({
    min: 3
  });
  req.check("date_parution").isLength({
    min: 6
  });


  const errors = req.validationErrors();
  if (errors) {
    console.log(errors);
   // req.flash("error", "Erreur");
    res.redirect("/ajout/livre");
  } else {
    req.getConnection((err, connection) => {
      const query = connection.query(
        "INSERT INTO livres set ?",
        data,
        (err, role) => {
          console.log(role);
          //req.flash("success", "Validé");
          res.redirect("ajout/livre");
        }
      );
    });
  }
};