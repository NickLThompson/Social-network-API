// bringing in the users and thoughts models
const { Users, Thoughts } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thoughts.find({})
        .then((Thoughts) => res)
    }
}