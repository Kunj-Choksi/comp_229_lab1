// require modules for the User Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let User = mongoose.Schema(
    {
        username: {
            type: String,
            default: "",
            trim: true,
            required: "username is required"
        },
        password: {
            type: String,
            default: "",
            trim: true,
            required: "password is required"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    }, {
        collation: "users"
    }
)

// configure model for User Model
let options = ({missingPasswordError: "Missing password"})

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", User);