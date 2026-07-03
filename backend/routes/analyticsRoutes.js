const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const { getAnalytics } = require('../controllers/analyticsController');
router.get('/', protect, adminOnly, getAnalytics);
module.exports = router;
