const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err)); // different way to do erroring
});

router.route('/add').post((req, res) => { //first endpoint that handles Get requests
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added')) // returns something in json format either user reg or error
        .catch(err => res.status(400).json('Error: ' + err)) 
});

module.exports = router;