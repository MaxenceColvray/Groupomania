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
            })
            console.log(post)
            post.save()
                .then(() => res.status(201).json({ message: 'Post créé' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    console.log("merde")
    console.log(req.body)

    /*const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });*/
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
