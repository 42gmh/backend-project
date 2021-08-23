# Twit-ish -- DigitalCrafts Flex 2021 Backend Project
This is a project demonstrating backend concepts. It is a lightweight Twitter clone that demonstrates CRUD operations from a rudimentary HTML frontend.

## Technologies Used
+ Node.js
+ Express
+ ES6 Templates
+ Seqeulize
+ Postgres
+ bcrypt
+ JWT

## CRUD
+ C - Create - Create Users and Twits (faux tweets)
+ R - Read - Read the twits. Read the user info.
+ U - Update - Update the user's screen name.
+ D - Delete - Delete any of "your" twits.

## Deployment
This is deployed to an AWS EC2 instance -- https://gregbep.xyz

## Setting Up
After cloning the repo:

1. This will install the requirements within the pacakge.json
```
    npm install
```

2. Create a .env file with the following env vars set
```
    JWT_SECRET=<your JWT secret>
    DB_USER=<your db user>
    DB_PASSWORD=<your db password>
    DB_NAME=<your db name>
    MY_PORT=<your application port>
```

3. Be sure to create your DB
```
createddb <your db name>
```

4. Initialize the Db with tables and starting data
```
node initdb.js
```

## Acknowledgements
+ Huge shout out to Sanjeev Thiyagarjan's extremely clear tuturial on PERN stack deploymeny to AWS EC2: https://github.com/Sanjeev-Thiyagarajan/PERN-STACK-DEPLOYMENT
+ The off-book BezKoder lesson we had on JWT/bcrypt which helped soldify my undesrtanding of how to do the authentication and authorization bits: https://www.bezkoder.com/node-js-jwt-authentication-postgresql/





