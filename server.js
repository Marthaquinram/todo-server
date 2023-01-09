// const todosRoutes = require('./routes/todos');
const routes = require('./routes/todosRoute');

//------DOTENV Config-------//
require('dotenv').config();
const express = require('express');
const cors = require('cors');



//-------APP USING EXPRESS & JSON --------//
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//------------- ERROR HANDLING -------------//
const notFoundHandler = require('./handlers/error404.js')
const errorHandler = require('./handlers/error500.js')


//-------MONGO DB-------------//
const mongoose = require('mongoose')
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Mongoose database");
  }).catch((error) => {
    console.log(error);

    app.use(routes)
  });







//------------- ROUTES -------------//
app.get('/', (req, res) => {
  res.send('SERVER IS ALIVE!!');
})






app.get('*', notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}`));

module.exports = app;
