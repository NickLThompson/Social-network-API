// requiring mongoose and creating a schema
const { Schema, model } = require('mongoose');

// this creates a new instance of a Mongoose schema to define shape of each document
const userSchema = new Schema(
    // this adds individual properties and their types
    // "required: true" is the same ass "allowNull: false;"
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // this is regex which validates that the input email is in email format
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        // Array of _id values referencing the Thought model
        thoughts: [{
            /* if i understand right, i believe this is creating an array called "thoughts"
            ** "type:" is defining what variable type each part of the array is wow this is poorly worded
            ** "ref:" is basically what the array name is printed as (?)
            */
            type: Schema.Types.ObjectId,
            ref: "Thoughts"
        }],
        // Array of _id values referencing the User model (self-reference)
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

// this gets the total amount of friends on this specific user's list
userSchema.virtual("getFriends").get(function() {
    return this.friends.length;
})

// creating a users model that uses the users schema
const Users = model("Users", userSchema);

// exporting the users module
module.exports = Users;