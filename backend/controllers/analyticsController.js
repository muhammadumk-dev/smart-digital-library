const User = require("../models/User");
const Resource = require("../models/Resource");
const SearchHistory = require("../models/SearchHistory");
const Download = require("../models/Download");

exports.getAnalytics = async (req, res) => {
  try {
    const [
      users,
      resources,
      searches,
      downloads,
      topResources,
      mostViewed,
    ] = await Promise.all([
      User.countDocuments(),
      Resource.countDocuments({ status: { $ne: "archived" } }),
      SearchHistory.countDocuments(),
      Download.countDocuments(),

      Resource.find({ status: { $ne: "archived" } })
        .sort({ downloads: -1, views: -1 })
        .limit(5),

      Resource.find({ status: { $ne: "archived" } })
        .sort({ views: -1, downloads: -1 })
        .limit(5),
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        users,
        resources,
        searches,
        downloads,
        topResources,
        mostViewed,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to load analytics",
    });
  }
};