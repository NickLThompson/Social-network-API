// bring in the model being used in that controller
const User = require("../models/User");

const userController = {
  // get request for getting all the users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get request for getting just a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // post request for creating a user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // post request for updating a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true },
      { new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with this id" })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete request for deleting a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with this id" })
          : res.json(dbUserData)
          )
          .catch(err => res.status(400).json(err));
  },
  // get request for adding a friend 
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId}},
      { new: true })
      .select("-__v")
      .populate("friends")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with this id" })
          : res.json(dbUserData)
          )
          .catch(err => res.status(400).json(err));
  },
  // delete request to delete a friend from your friends list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId}},
      { new: true })
      .select("-__v")
      .populate("friends")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with this id" })
          : res.json(dbUserData)
          )
          .catch(err => res.status(400).json(err));
  },

};

module.exports = userController;