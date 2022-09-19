
const express = require('express');
const app = express();
app.use(express.json()); //Convertit les requètes Post en objet utilisable

const path = require('path');

const cors = require('cors')
 
app.use(cors())


/*Gère les erreurs de CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/*Connection à notre BDD mongoDB */
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://maxence:Azerty444@cluster0.nmhpjpe.mongodb.net/groupomania?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

/*Ici on importe nos routeurs*/
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post', postRoutes);


module.exports = app;
