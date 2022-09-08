const bcrypt = require("bcryptjs");
const connection = require("../../Library/databaseConnection");
const jwt = require("jsonwebtoken");
require("dotenv").config();



//ADD SUBSCRIBTION
async function addSubscription(req, res) {
   
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
}

//DELETE SUBSCRIPTION
async function cancelSubscription(req, res) {
    
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


module.exports = {
    addSubscription, cancelSubscription
}