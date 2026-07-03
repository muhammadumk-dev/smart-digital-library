function adminOnly(req, res, next) {
  if (!req.user || !['admin', 'librarian'].includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Admin or librarian access only' });
  }
  next();
}

module.exports = adminOnly;
