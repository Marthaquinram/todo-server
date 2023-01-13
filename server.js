const todosRoutes = require('./routes/todosRoute');


//------DOTENV Config-------//
require('dotenv').config();
const express = require('express');
const cors = require('cors');



//-------APP USING EXPRESS & JSON --------//
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MIDDLEWARE
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
})

//------------- ERROR HANDLING -------------//
const notFoundHandler = require('./handlers/error404.js')
const errorHandler = require('./handlers/error500.js')


//-------MONGO DB-------------//
const mongoose = require('mongoose')
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log('Connected to Mongoose database & listening on port', process.env.PORT));

  }).catch((error) => {
    console.log(error);

  });



//------------- ROUTES -------------//
app.use('/api/todos', todosRoutes);
// app.post('/save', saveTodo)




app.get('*', notFoundHandler);
app.use(errorHandler);



module.exports = app;
