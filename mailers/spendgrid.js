/**
POST https://bw-interviews.herokuapp.com/spendgrid/send_email

Headers:
Content-Type: application/json
X-Api-Key: api_key_gdwLr04X4DWUUVXhEkLxZJtX

Body:
{
"sender": "brightwheel <noreply@mybrightwheel.com>",
"recipient": "Miss Susan <susan@abcpreschool.org>",
"subject": "Your Weekly Report",
"body": "<h1>Weekly Report</h1><p>You saved 10 hours this
week!</p>"
}
 */

const fetch = require('node-fetch');
const config = require('../config.json')
const process = require('../process/processData');
const apiUrl = "https://bw-interviews.herokuapp.com/spendgrid/send_email"

const sendEmail = async (reqData) => {

    const params = {
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": config.spendgrid_api_key
        },
        body: JSON.stringify(createRequestBody(reqData)),
        method: "POST"
    };
  
    let response = await fetch(apiUrl, params);
    let data = await response.json();
    return data;
}

const createRequestBody = (reqData) => {
    return {
            "sender": reqData.from_name + " <" + reqData.from + ">",
            "recipient": reqData.to_name + " <" + reqData.to + ">",
            "subject": reqData.subject,
            "body": process.processHTML(reqData.body)
        }
}

module.exports = {
    sendEmail: sendEmail
}