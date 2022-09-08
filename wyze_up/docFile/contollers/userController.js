const bcrypt = require("bcryptjs");
const connection = require("../../Library/databaseConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();



//ADD SUBSCRIBTION
async function addSubscription(req, res) {
    if (req.users.userType == "user") {
        const {id, status, userName, userEmail} = req.body;
        try{
            connection.query(`INSERT INTO subscriptions(id, status, userName, userEmail) VALUES
            ("${id}", "${status}", "${userName}", "${userEmail}")`,
            (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        } catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    } else {
        res.send("Not a user")
    }
}

//DELETE SUBSCRIPTION
async function cancelSubscription(req, res) {
    if (req.users.userType === "user") {
        try {
          connection.query(
            `DELETE FROM subscriptions WHERE id=${req.params.id}`,
            (err, result) => {
              if (err) throw err;
              res.send(result);
            }
          );
        } catch (error) {
          console.log(error);
          res.status(400).send(error);
        }
    }
}


module.exports = {
    addSubscription, cancelSubscription
}