const Resource = require("../models/Resource");
const SearchHistory = require("../models/SearchHistory");
const {
  recommendResources,
} = require("../services/recommendationService");

/* ============================
   GET PERSONALIZED RECOMMENDATIONS
============================ */
exports.getRecommendations = async (req, res) => {
  try {
    const user = req.user;

    const resources = await Resource.find({
      status: { $ne: "archived" },
    }).sort({ downloads: -1, views: -1 });

    const searches = await SearchHistory.find({
      user: user._id,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    const interests = searches.map((search) => search.query);

    const recommendations = recommendResources(resources, {
      department: user.department,
      level: user.level,
      interests,
    });

    res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate recommendations",
    });
  }
};

/* ============================
   GET TRENDING RESOURCES
============================ */
exports.getTrendingResources = async (req, res) => {
  try {
    const resources = await Resource.find({
      status: { $ne: "archived" },
    })
      .sort({
        downloads: -1,
        views: -1,
        createdAt: -1,
      })
      .limit(12);

    res.status(200).json({
      success: true,
      resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to load trending resources",
    });
  }
};

/* ============================
   GET SIMILAR RESOURCES
============================ */
exports.getSimilarResources = async (req, res) => {
  try {
    const currentResource = await Resource.findById(req.params.id);

    if (!currentResource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    const resources = await Resource.find({
      _id: { $ne: currentResource._id },
      status: { $ne: "archived" },
    });

    const recommendations = recommendResources(resources, {
      department: currentResource.department,
      level: currentResource.level,
      interests: [
        currentResource.title,
        currentResource.category,
        currentResource.courseCode,
        ...(currentResource.keywords || []),
      ],
    });

    res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to load similar resources",
    });
  }
};