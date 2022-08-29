/*const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;*/

const express = require('express');
const app = express();
app.use(express.json()); //Convertit les requètes Post en objet utilisable


/*Gère les erreurs de CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/*Connection à notre BDD mongoDB */
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://maxence:Azerty444@cluster0.nmhpjpe.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

/*Ici on importe nos routeurs*/
const userRoutes = require('./routes/user');
//const sauceRoutes = require('./routes/sauce');

app.use('/api/auth', userRoutes);
//app.use('/api/sauces', sauceRoutes);


module.exports = app;
