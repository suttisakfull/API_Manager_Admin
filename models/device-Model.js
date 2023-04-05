const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const deviceSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        branch:{
            type: ObjectId,
            ref: "Branch"
        },
        category: {
            type: ObjectId,
            ref: "Category"
        },
        commodity:{
            type: String,
            required: true,
        },
        sn: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        images: {
            type: Array
        },
        date: {
            type: Date,
            default: Date.now,
          },


    },
    { timestamps: true }
);
module.exports = mongoose.model("Device", deviceSchema);

