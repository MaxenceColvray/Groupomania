const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/user')


exports.signup = (req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.email })
        .then((user) => {
            console.log(user)
            if (user !== null) {
                return res.status(401).json({ error: "un compte existe deja" })
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                            .catch(error => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }

                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id/* , isAdmin : user.admin*/ },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.verify = (req, res, next) => {
    console.log(req.auth.userId)
    User.findOne({ _id: req.auth.userId })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
}


