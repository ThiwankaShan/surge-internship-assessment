<h1 align="center">
Surge Global - SE Internship - Assessment
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>

<p align="center">
   <a href="#">
      <img src="https://img.shields.io/badge/Node-18.0.0-green" />
   </a>
      <a href="#">
      <img src="https://img.shields.io/badge/Express-4.18.1-yellow" />
   </a>
   <a href="#">
      <img src="https://img.shields.io/badge/React-18.2.0-blue" />
   </a>
</p>

## clone or download
```terminal
$ git clone https://github.com/amazingandyyy/mern.git
```

## project structure
```terminal
LICENSE
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^18.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

note, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm start   // run it locally

```

## Server-side usage(PORT: 8000)

(You need to add Configs in .env)

```terminal
// in the root level (./server/.env)
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> 
$ echo "JWT_EXPIRATION_MINUTES = 120" >> 

$ echo "PORT=3000" >> 
$ echo "MONGODB_URI=YOUR_MONGODB_URI" >> 
```

```terminal
// in the root level (./server/.env)
$ echo "EMAIL_SERVICE_HOST = YOUR_EMAIL_SERVICE_HOST" >> // smtp.ethereal.email
$ echo "EMAIL_SERVICE_PORT = YOUR_EMAIL_SERVICE_PORT" >> // 587
$ echo "EMAIL_SERVICE_USER = EMAIL_PROVIDED_BY_THE_EMAIL_SERVICE" >> // jone.doe@ethereal.email
$ echo "EMAIL_SERVICE_PASSWORD = EMAIL_PROVIDED_BY_THE_EMAIL_SERVICE" >>
```
(Create an admin account)
```terminal
// in the server folder
npm run seed
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start  // run it locally
```
### DEFAULT ADMIN CREDENTIALS
> Email : admin@gmail.com

> pwd : admin123

# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^0.27.2 | axios: ^0.27.2
bootstrap: ^5.1.3 | body-parser: ^1.20.0
js-cookie: ^3.0.1 | cookie-parser: ^1.4.6
rc-table: ^7.25.0 | dotenv: ^16.0.1
react: ^18.2.0 | express: ^4.18.1
react-bootstrap: ^2.4.0 | jsonwebtoken: ^8.5.1
react-dom: ^18.2.0 | mongoose: ^6.4.2
react-router-dom: ^6.3.0 | morgan: ^1.10.0
react-scripts: 5.0.1 | nodemailer: ^6.7.7
web-vitals: ^2.1.4 | nodemon: ^1.3.3
@testing-library/jest-dom: ^5.16.4 | validator: ^13.7.0
@testing-library/react: ^13.3.0 |
@testing-library/user-event: ^13.5.0 |

# Screenshots of this project

User can sign in
![User(admin) can sign in]()

Home page - user
![User visit Home page]()

Home page - admin
![Admin visit Home page]()

User create/update form
![Admin visit Home page]()

Note create/update form
![Admin visit Home page]()

## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

[Create new Issues](https://github.com/ThiwankaShan/surge-internship-assessment/issues) (preferred)

### License
[MIT]()