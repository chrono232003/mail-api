const { htmlToText } = require('html-to-text');

const processHTMLToText = (html) => {
    return htmlToText(html);
}

/**
 * Validate the data that is passed into the api service.
 * Expecting json with 6 pieces of data:
 * from
 * from_name
 * to
 * to_name
 * subject
 * body
**/
const validateData = (reqObj) => {
    //make sure that we have all of the data expected.
    for (item in reqObj) {
        if (!checkForValue(reqObj[item])) {
            return "Missing data for " + item
        }
    }

    if (!validEmail(reqObj.from)) {
        return "from is not a valid email address";
    }

    if (!validEmail(reqObj.to)) {
        return "to is not a valid email address";
    }

    //if we made it this far, all the data checks have passed. Return a happy response.
    return "valid";

}

const checkForValue = (value) => {
    return value != undefined && value != null && value != "";
} 

const validEmail = (email) => {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
}


module.exports = {
    validateData: validateData,
    processHTML: processHTMLToText
}