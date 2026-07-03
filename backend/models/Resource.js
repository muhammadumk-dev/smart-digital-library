const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Book",
        "Journal",
        "Project",
        "Thesis",
        "Dissertation",
        "Past Question",
        "Lecture Note",
        "Research Paper",
      ],
    },

    department: {
      type: String,
      default: "",
      index: true,
    },

    courseCode: {
      type: String,
      default: "",
      uppercase: true,
    },

    level: {
      type: String,
      default: "",
    },

    keywords: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    coverUrl: {
      type: String,
      default: "",
    },

    publicationYear: {
      type: Number,
      default: new Date().getFullYear(),
    },

    downloads: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalRatings: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   SEARCH INDEX
========================= */
resourceSchema.index({
  title: "text",
  author: "text",
  keywords: "text",
  description: "text",
});

module.exports = mongoose.model(
  "Resource",
  resourceSchema
);