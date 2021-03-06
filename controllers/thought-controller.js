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
    createThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    {$push: {thoughts: _id}},
                    {new: true}); 
            })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: "No thoughts found with this id" });
                    return;
                }
                res.json(dbThoughtsData)
            })
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
    // get request to add a new reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true },
            { runValidators: true}
            )
        .populate(
             {path: 'reactions' },
             { select: '-__v' }
             )
        .select('-__v')
        .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts found with this id'});
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err))

    },

    // get request to delete a reaction by ID
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new : true},
            )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts found with this  ID!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;