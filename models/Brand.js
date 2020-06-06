const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Brand can be anything like asus , dell. lenevo and so many

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 20,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "myuser",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mybrand", brandSchema);
