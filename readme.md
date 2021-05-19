# Prerequisites:

The user will need to have node and npm installed on their machine to run this program.
Here is a good tutorial: https://www.npmjs.com/get-npm

# How to install the application

1. On a terminal, clone this repository locally to your system.
1. Once cloned, navigate to the root folder of the project on your system.
1. Run 'npm install' to install all the dependencies from the package.json file
1. In the root file, you will see an environmental variable file (config.json) which contains 3 configurable properties (See below).
    * spendgrid_api_key - Get this from the Brightwheel to access the Spendgrid api service.
    * snailgun_api_key - Get this from the Brightwheel to access the Snailgun api service.
    * default_mail_service - (spendgrid, snailgun) Choose one of these to be the default.
1. Testing (Optional) - There are a suite of tests in the "tests" folder. To run these, run 'npm run test' from the project root folder in the terminal.

# How to run the application

1. Once the previous steps are completed, run 'node server.js' from the root folder in the terminal to start the api service. 
1. The service should start up locally using port 3000 by default.
1. There is one api service endpoint that should be 'http://127.0.0.1:3000/send'.
    * It will need to be ran as a POST request.
    * This can be ran in Postman or curl on the terminal.
    * sample header:
      ```
      {
         Content-Type: application/json
         X-Api-Key: api_key_gdwLr04X4DWUUVXhEkLxZJtX

      }
      ```
   * sample request:
   ```
   {
      "from": "noreply@mybrightwheel.com",
      "from_name": "brightwheel",
      "to": "susan@abcpreschool.org",
      "to_name": "Miss Susan",
      "subject": "Your Weekly Report",
      "body": "<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>"
   }

   ```


# Language and Libraries

I chose Javascript using Node.js and Express for the exercise because they are lightweight, fast and perfect for the usecase.

Node can be spun up quickly and easily locally and requires very few dependencies to run.

As for Express.js, it is perfect for an api with its routing capabilites and easy access to request and response objects.

# Tradoffs for project requirements

There are a few things that I would have built differently or expanded upon if I had more time on the project.

1. There was a status check GET endpoint that I could have used to check the status of the email delivery (https://bw-interviews.herokuapp.com/snailgun/emails/...). I did not get that piece of functionality in. But, it would have been helpful for that to be polled and give a user an updated status.

1. Testing - I only wrote one test suite for the validation. I would have liked to write some unit tests around the email function and the api calls themselves. That way, I could just run all the integrations with one cmd in the console 'npm run test' vs manually testing each one and all the scenarios.

1. I would have followed the DRY principle a lot closer. You may notice that the spendgrid and snailgun functions are very similar. A lot of that code could have been abstracted to another function or class. If I need to make changes now, I would have to make sure I make them in both classes vs one parent class. This also goes for the email functions in the 'sendEmail' function. I call both email apis much the same, I could have abstracted a lot of that logic.

1. Data Models - I am a big believer in structured data. You will notice how the requests were created where an object was created and the data was mapped. This might have been better done in a separate class. also, the request data object could have been mapped to a data object to maintain and confirm structure.
