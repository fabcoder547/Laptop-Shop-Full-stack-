const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    description: {
      brand: {
        type: Schema.Types.ObjectId,
        ref: "mybrand",
      },
      processor: {
        type: Schema.Types.Mixed,
      },

      memory: {
        ram: {
          type: Number,
          trim: true,
        },
        rom: {
          type: Number,
          trim: true,
        },
        display: {
          type: String,
          trim: true,
        },
      },
    },
    photo: {
      data: Buffer, //read about buffer datatype

      contentType: String,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("myproduct", productSchema);
