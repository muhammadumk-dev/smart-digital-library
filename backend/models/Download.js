const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Download', downloadSchema);
