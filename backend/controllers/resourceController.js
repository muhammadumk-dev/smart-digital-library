const Resource = require("../models/Resource");
const SearchHistory = require("../models/SearchHistory");
const Download = require("../models/Download");

/* ============================
   CREATE RESOURCE
============================ */
exports.createResource = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      uploadedBy: req.user._id,
    };

    if (typeof payload.keywords === "string") {
      payload.keywords = payload.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
    }

    if (req.files?.file?.[0]) {
      payload.fileUrl = `/uploads/resources/${req.files.file[0].filename}`;
    }

    if (req.files?.cover?.[0]) {
      payload.coverUrl = `/uploads/covers/${req.files.cover[0].filename}`;
    }

    const resource = await Resource.create(payload);

    res.status(201).json({
      success: true,
      resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================
   GET ALL RESOURCES
============================ */
exports.getResources = async (req, res) => {
  try {
    const { q, category, department } = req.query;

    const filter = {
      status: { $ne: "archived" },
    };

    if (category) filter.category = category;
    if (department) filter.department = department;

    if (q) {
      filter.$or = [
        { title: new RegExp(q, "i") },
        { author: new RegExp(q, "i") },
        { keywords: new RegExp(q, "i") },
        { courseCode: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
      ];

      if (req.user) {
        await SearchHistory.create({
          user: req.user._id,
          query: q,
        });
      }
    }

    const resources = await Resource.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resources.length,
      resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================
   GET RESOURCE DETAILS
============================ */
exports.getResourceById = async (req, res) => {
  try {
    const resource =
      await Resource.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true }
      );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================
   DOWNLOAD RESOURCE
============================ */
exports.downloadResource = async (req, res) => {
  try {
    const resource =
      await Resource.findByIdAndUpdate(
        req.params.id,
        { $inc: { downloads: 1 } },
        { new: true }
      );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    await Download.create({
      user: req.user?._id,
      resource: resource._id,
    });

    res.status(200).json({
      success: true,
      fileUrl: resource.fileUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};