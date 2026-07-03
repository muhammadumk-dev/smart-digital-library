const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const { getRecommendations } = require('../controllers/recommendationController');
router.get('/', protect, getRecommendations);
module.exports = router;
