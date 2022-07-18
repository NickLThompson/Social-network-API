const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    
} = require("../../controllers/thought-controller")

// /api/thoughts

router.route("/")
.get(getThoughts)
.get(getSingleThought)
.post(createThought)
.put(updateThought)
.delete(deleteThought)

// /api/thoughts/:thoughtId
router.route("/:thoughtId")
.get(getThoughts)
.get(getSingleThought)
.post(createThought)
.put(updateThought)
.delete(deleteThought)

module.exports = router;