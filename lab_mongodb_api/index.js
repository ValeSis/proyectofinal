
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

const app = express();

app.set('view engine', 'ejs');
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(allowCrossDomain);
/* 
* Connect to MongoDB
*/
mongoose
  .connect(
    'mongodb://mongo:27018/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected SUCCESS'))
  .catch(err => console.log(err));

/*
* Definition of MongoDB models
*/
User = require('./models/User');
Laboratorio = require('./models/Laboratorio');
Horario = require('./models/Horario');

/*
* DEFINICION DE SERVICIOS API REST
*/
//dummy rest
app.get('/apiejemplo', (req, res) => res.send('Hello World with Express'));

//******************************************************************* */

/*
* User Services
*/
//obtener todos los usuarios
app.get('/laboratorio/getAll', (req, res) => {

  Laboratorio.find({}).then(function (users) {
    res.send(users);
  });

});
//crear un usuario
app.post('/laboratorio/create', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.body);
  const newUser = new Laboratorio({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  });
  console.log("Saving user");
  console.log(newUser);
  //save user in database
  newUser.save()
    .then(item => res.status(200).json({ msg: 'success' }))
    .catch(err => res.status(404).json({ msg: err }));;
});

/**
 * Horarios
 */
app.get('/horario/getAll', (req, res) => {

  Horario.find({}).then(function (users) {
    res.send(users);
  });

});

//crear un usuario
app.post('/horario/create', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.body);
  const newUser = new Horario({
    laboratorioid: req.body.laboratorioid,
    horainicio: req.body.horainicio,
    horafin: req.body.horafin,
    materia: req.body.materia,
    docente: req.body.docente
  });
  console.log("Saving horario");
  console.log(newUser);
  //save user in database
  newUser.save()
    .then(item => res.status(200).json({ msg: 'success' }))
    .catch(err => res.status(404).json({ msg: err }));;
});

app.post('/horario/consultar', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.body);
  

  var lista = [];

  Horario.find({ $and: [{ laboratorioid: req.body.laboratorioid }] }).then(function (horarios) {
    console.log(horarios);
    horarios.forEach(element => {
      console.log("inicio horario*****");
      console.log(element);
      console.log("item horario*****");
      console.log(element.horainicio);
      horainicio = toDateWithOutTimeZone(element.horainicio)
      horafin = toDateWithOutTimeZone(element.horafin);
      hora = toDateWithOutTimeZone(req.body.hora);

      console.log(horainicio);
      console.log(horafin);
      console.log(hora);

      console.log("fecha horario*****");
      if (hora >= horainicio && hora <= horafin) {
        console.log("Agregar elemento");
        console.log(element);
        //solo puede existir un horario para  una hora determinada
        lista.push(element);
       // res.send(lista);

      }


      /*horainicio = toDateWithOutTimeZone(element.horainicio);
      horafin = toDateWithOutTimeZone(element.horafin);
      hora = toDateWithOutTimeZone(reqObj.hora);
      console.log(horainicio);
      console.log(horafin);
      console.log(hora);
      if (hora > horainicio && hora < horafin) {

        lista.push(element);
      }*/


    })

  res.send(lista);

  }).catch(err => res.status(404).json({ msg: err }));
  //res.send(lista);

  console.log("Consulta Laboratorios");


});
//TODO:  crear y validar codigos


//******************************************************************* */


/*
* User Services
*/
//obtener todos los usuarios
app.get('/user/getAll', (req, res) => {

  User.find({}).then(function (users) {
    res.send(users);
  });

});
//crear un usuario
app.post('/user/create', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    tipo: req.body.tipo
  });
  console.log("Saving user");
  console.log(newUser);
  //save user in database
  newUser.save()
    .then(item => res.status(200).json({ msg: 'success' }))
    .catch(err => res.status(404).json({ msg: err }));;
});
//login
app.post('/user/login', (req, res) => {
  // Enable cors
  // Enable cors
  try {
    console.log("Body request:");
    console.log(req.body);
    User.findOne({ username: req.body.username }, function (err, user) {

      if (err) {
        return res.status(404).json({ msg: err });
      }
      if (user) {
        console.log(user);

        if (user.password == req.body.password) {
          return res.status(200).json({ msg: 'success', username: user.username, tipo: user.tipo });

        }
        else {
          return res.status(404).json({ msg: 'Incorrect password' });

        }

      }
      else {
        return res.status(404).json({ msg: 'user not found' });
      }
    });

    console.log("end login");
  }
  catch (err) {
    return res.status(404).json({ msg: 'error' });
  }


});







//delete un  comentario 
/*app.delete('/comentario/:id', (req, res) => {
  // Enable cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  console.log("Body request:");
  console.log(req.params);
  Comentario.remove({ _id: req.params.id }, function (err) {
    if (!err) {
      return res.status(200).json({ code: 200, msg: "success" })
    }
    else {
      return res.status(404).json({ code: 404, msg: err });
    }
  });
});*/




// Port
const port = 3000;

//app.listen(port, () => console.log('Server running...'));

app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});


function toDateWithOutTimeZone(date) {
  let tempTime = date.split(":");
  let dt = new Date();
  dt.setHours(tempTime[0]);
  dt.setMinutes(tempTime[1]);
  dt.setSeconds(tempTime[2]);
  return dt;
}