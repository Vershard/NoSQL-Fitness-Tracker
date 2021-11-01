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



module.exports = router;