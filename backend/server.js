const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Catching uncaught Exceptions [by sync functions]
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exceptions! Shutting Down');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB CONNECTION SUCCESSFUL');
  });

// Starting the Server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on Port ${port}...`);
});

// Catching unhandled Rejections [by async functions]
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! Shutting Down');
  server.close(() => {
    process.exit(1);
  });
});
