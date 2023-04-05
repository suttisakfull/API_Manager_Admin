const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: ObjectId,
            ref: "Category"
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        },
        images: {
            type: Array
        },


    },
    { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
