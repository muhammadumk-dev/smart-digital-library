const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, department, level } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });
    const user = await User.create({ name, email, password, department, level });
    res.status(201).json({ success: true, token: generateToken(user), user: { id: user._id, name, email, role: user.role, department, level } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, token: generateToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role, department: user.department, level: user.level } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.me = async (req, res) => res.json({ success: true, user: req.user });
