const mongoose = require("mongoose");

const pageSchema = mongoose.Schema(
  {
    pId: {
      type: String,
      required: true,
    },
    uId: {
      type: String,
      required: true,
      ref: "User",
    },
    pageName: {
      type: String,
      required: [true, "Please add page name"],
    },
    pageDescription: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Please add phone no"],
      unique: true,
    },
    link: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
    },
    statusComment: {
      type: String,
    },
    tempPageName: {
      type: String,
      required: [true, "Please add page name"],
    },
    tempPageDescription: {
      type: String,
    },
    tempPhone: {
      type: String,
      required: [true, "Please add phone no"],
      unique: true,
    },
    tempLink: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("page", pageSchema);
