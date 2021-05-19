const process = require('../process/processData');
const config = require('../config.json');
const snailgun = require('../mailers/snailgun');
const spendgrid = require('../mailers/spendgrid');

const processEmail = (req, res) => {
    var validateData = process.validateData(req.body)

    if (validateData != "valid") {
        //A failed validation response was given, throw error and return to client
        return res.status(400).send("Malformed Request: " + validateData);
    }

    //send email
    if (config.default_mail_service == "snailgun") {
        return callSnailGun(req.body, res);
    } else if (config.default_mail_service == "spendgrid") {
        return callSpendgrid(req.body, res)
    } else {
        console.log("config error! Valid email service not specified")
        return res.status(500).send("Whoops! Something went wrong.")
    }
    
}

const callSnailGun = (reqBody, res) => {

    snailgun.sendEmail(reqBody)
    .then(data => {
        if (data.status == "queued") {
            return res.status(200).json(data);
        } else {
            //Expected response not received
            return res.status(500).res("Error sending email, please check back later.");
        }
    })

}

const callSpendgrid = (reqBody, res) => {

     spendgrid.sendEmail(reqBody)
    .then(data => {
        console.log(data.status);
        if (data.id) {
            return res.status(200).json(data);
        } else {
            //Expected response not received
            return res.status(500).res("Error sending email, please check back later.");
        }
    })

}

module.exports = {
    process: processEmail
}