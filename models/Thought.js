// requiring mongoose and creating a schema, also needing moment.js
const { Schema, model, Types } = require('mongoose');
const moment = require("moment");

// creating a reaction schema, basically just comments
const reactionSchema = new Schema(
    {
        // giving a custom id for each reaction written
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        // this is the body of each reaction; where all the text is
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // using Moment to get the current date and time
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
        },
    },
        {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// this creates a new instance of a Mongoose schema to define shape of each document
const thoughtSchema = new Schema(
    // this adds individual properties and their types
    // "required: true" is the same as "allowNull: false;"
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // using Moment to get the current date and time
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
        },
        username: {
            type: String,
            required: true
        },
        reaction: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)



// this gets the total amount of friends on this specific user's list
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reaction.length;
})

// creating a Thoughts model that uses the Thoughts schema
const Thoughts = model("Thoughts", thoughtSchema);

// exporting the Thoughts module
module.exports = Thoughts;