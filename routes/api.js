const router = require('express').Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
    console.log("hit the post route on backend")
    Workout.create({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
            console.log("DB WORKOUT", dbWorkout)
        })
        .catch(err => {
            res.json(err);
        });
})

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
})

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
            console.log(dbWorkouts)
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        });
})

// MY WORK
router.put('/api/workouts/:id', (req, res) => {

    Workout.findByIdAndUpdate(req.params.id, {
        $push: {
            exercises: (req.body)
        }
    },
        {
            new: true, runvalidators: true

        })
        .then((dbWorkouts) => res.status(200).json(dbWorkouts))
        .catch((err) => res.status(500).json(err))
});

router.delete('/api/workouts/:id', (req, res) => {

   
    Workout.findByIdAndUpdate(req.params.id, {
        $pull: {
            exercises: { _id : req.body.id } 
        }
    },
        {
            new: true, runvalidators: true

        })
        .then((dbWorkouts) => res.status(200).json(dbWorkouts))
        .catch((err) => res.status(500).json(err))
});




module.exports = router;