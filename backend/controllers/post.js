const Post = require('../models/post')
const User = require('../models/user')


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
    console.log(req.body.title)
    console.log(req.body.description)
    console.log(req.file)

    Post.updateOne({ _id: req.params.id }, {
        title: req.body.title,
        description: req.body.description,
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        _id: req.params.id
    })
        .then(() => res.status(200).json({ message: 'Objet modifié!' }))
        .catch(error => res.status(401).json({ error }));
};

exports.postsDisplay = (req, res, next) => {
    //console.log(req.auth.userId)
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


exports.Liked = (req, res, next) => {
    console.log(req.body.like)

    //console.log(JSON.parse(req.body))
    //console.log(req.auth.userId)


    switch (req.body.like) {
        case 1:
            Post.updateOne({ _id: req.body._id }, {
                $push: { usersLiked: req.auth.userId },
                $inc: { likes: 1 }
            })
            .then((a) => res.status(200).json(a))
                //.then(() => res.status(200).json({ message: 'Objet modifié !' }))
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

            /*Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 }
                        })
                            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                            .catch(error => res.status(400).json({ error }))
                    } else if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 }
                        })
                            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                            .catch(error => res.status(400).json({ error }))
                    } else {
                        console.log('erreur')
                        res.status(400).json({ message: 'erreur' })
                    }
                })*/
            break
        default:
            res.status(400).json({ message: 'erreur !' })
    }
};