const router = require('express').Router(); //same two inputs as in other file
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => { //Get command
    Exercise.find()
        .then(exercises => res.json(exercises)) //return as json
        .catch(err => res.status(400).json('Error: ' + err)); //or error out
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save() 
        .then(() => res.json('Exercise added!')) //saves exercise
        .catch(err => res.status(400).json('Error: ' + err)); // or errors out
});

//Get the exercise
router.route('/:id').get((req, res) => { 
    Exercise.findById(req.params.id) //gets the id from the url
        .then(exercise => res.json(exercise)) //return as json
        .catch(err => res.status(400).json('Error: ' + err)); // or error out
});

//delete the exercise
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//updates the exercise
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => { // takes all the parameters and "updates them" based on user input
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save() // saves the updated parameters
                .then(() => res.json('Exercise updated.')) //return updated
                .catch(err => res.status(400).json('Error: ' + err)); // or error
        })
        .catch(err => res.status(400).json('Error: ' + err)); 
});



module.exports = router;