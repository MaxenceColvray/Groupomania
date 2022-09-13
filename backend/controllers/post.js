const Post = require('../models/post')

exports.postAdd = (req, res, next) => {
    console.log(req.body)
    console.log("===< " + req.file.filename)
   const postObjectt = req.body;
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    post.save()
    .then(() => res.status(201).json({ message: 'Post créé' }))
    .catch(error => res.status(400).json({ error }))
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
