/**
POST https://bw-interviews.herokuapp.com/snailgun/emails

Headers:
Content-Type: application/json
X-Api-Key: api_key_gdwLr04X4DWUUVXhEkLxZJtX

Request body:
{
"from_email": "noreply@mybrightwheel.com",
"from_name": "brightwheel",
"to_email": "susan@abcpreschool.org",
"to_name": "Miss Susan",
"subject": "Your Weekly Report",
"body": "<h1>Weekly Report</h1><p>You saved 10 hours this
week!</p>"
}
 */

const { response } = require('express');
const fetch = require('node-fetch');
const config = require('../config.json')
const process = require('../process/processData');

const apiUrl = "https://bw-interviews.herokuapp.com/snailgun/emails"

const sendEmail = async (reqData) => {

    const params = {
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": config.snailgun_api_key
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
            "from_email": reqData.from,
            "from_name": reqData.from_name,
            "to_email": reqData.to,
            "to_name": reqData.to_name,
            "subject": reqData.subject,
            "body": process.processHTML(reqData.body)
        }
}

module.exports = {
    sendEmail: sendEmail
}