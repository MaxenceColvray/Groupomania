const Post = require('../models/post')
const User = require('../models/user')
const fs = require('fs');


exports.postAdd = (req, res, next) => {
    User.findOne({ _id: req.auth.userId })
        .then((user) => {
            const post = new Post({
                name: user.name,
                userId: req.auth.userId,
                title: req.body.title,
                description: req.body.description,
                imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                likes: 0,
                usersLiked: []
            })
            console.log(post)
            post.save()
                .then(() => res.status(201).json({ message: 'Post créé' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId == req.auth.userId || req.auth.userId == req.auth.userIdAdmin) {
                Post.updateOne({ _id: req.params.id }, {
                    title: req.body.title,
                    description: req.body.description,
                    imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    _id: req.params.id
                })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            } else {
                res.status(401).json({ message: 'Not authorized' });

            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.postsDisplay = (req, res, next) => {
    console.log(req.auth.userId)
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};



exports.postDisplay = (req, res, next) => {
    console.log(req.params.id)
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};


exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId == req.auth.userId || req.auth.userId == req.auth.userIdAdmin) {
                console.log(post.imageURL)
                const filename = post.imageURL.split('/images/')[1];
                console.log(filename)
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            } else {
                res.status(401).json({ message: 'Not authorized' });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};


exports.Liked = (req, res, next) => {
    switch (req.body.like) {
        case 1:
            Post.updateOne({ _id: req.body._id }, {
                $push: { usersLiked: req.auth.userId },
                $inc: { likes: 1 }
            })
                .then((a) => res.status(200).json(a))
                .catch(error => res.status(400).json({ error }))
            break
        case 0:
            Post.updateOne({ _id: req.body._id }, {
                $pull: { usersLiked: req.auth.userId },
                $inc: { likes: -1 }
            })
                //Post.findOne({ _id: req.params.id })
                .then((a) => res.status(200).json(a))
                //.then(() => res.status(200).json({ message: 'Objet modifié !' }))
                .catch(error => res.status(400).json({ error }))
            break
        default:
            res.status(400).json({ message: 'erreur !' })
    }
};