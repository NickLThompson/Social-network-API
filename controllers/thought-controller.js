// bring in the thought and users models
const { User, Thought } = require("../models");

const thoughtController = {
    // get request to get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get request to find a single thought 
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that id" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // post request for creating a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: "Thought cretaed, but no user found with this id",
                    })
                    : res.json("Thought created")
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // put request to update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this id" })
                    : res.json(thought)
            )
            .catch((err) => {
                consol.log(err);
                res.status(500).json(err);
            });
    },
    // delete request to delete a certain thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with this id" })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: "Thought created but no user found with this id" })
                    : res.json({ message: "Thought successfully deleted" })
            )
            .catch((err) => res.status(500).json(err));
    },
    
}

module.exports = thoughtController;