const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// type, name, duration, weight, reps ,sets, distance

const workoutSchema = new Schema({

    day: {
        type: Date,
        default: ()=> new Date(),
    },
    exercises : [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter an exercise type"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter an exercise name"
            },
            duration: {
                type: Number,
                required: "Enter an exercise duration"
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            },
        }
    ]
})

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;