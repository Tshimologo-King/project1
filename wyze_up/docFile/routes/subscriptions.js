const bcrypt = require("bcryptjs");
const connection = require("../../Library/databaseConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userControl = require("../../docFile/contollers/userController");
const router = require("./posts");

//Getting all Subscriptions in DB
router.get("/", (req, res) => {
    try {
      connection.query("SELECT * FROM subscriptions", (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });
  
//Getting all Subscriptions of users by id
router.get("/:id", (req, res) => {
try {
    connection.query(
    `SELECT * FROM Subscriptions where idsubscriptions=${req.params.id}`,
    (err, result) => {
        if (err) throw err;
        res.send(result);
    }
    );
} catch (error) {
    console.log(error);
    res.status(400).send(error);
}
});

//Add a new subscriber
router.post("/", (req, res) => {
    return userControl.addSubscription(req, res);
});

//delete a subscription
router.delete("/:id", (req, res) => {
    return userControl.cancelSubscription(req, res);
});

module.exports = router;


