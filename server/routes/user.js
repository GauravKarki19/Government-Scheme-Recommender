const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/user/me - fetch current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      state: user.state,
      district: user.district,
      savedSchemes: user.savedSchemes,
      appliedSchemes: user.appliedSchemes
    });
  } catch (err) {
    console.error('Get me error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/user/schemes/save - save a scheme
router.post('/schemes/save', auth, async (req, res) => {
  try {
    const { schemeId, name, link } = req.body;
    if (!schemeId || !name) return res.status(400).json({ message: 'schemeId and name required' });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const exists = user.savedSchemes.some((s) => s.schemeId === schemeId);
    if (!exists) {
      user.savedSchemes.push({ schemeId, name, link });
      await user.save();
    }

    res.json({ savedSchemes: user.savedSchemes });
  } catch (err) {
    console.error('Save scheme error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/user/schemes/save/:schemeId - remove saved scheme
router.delete('/schemes/save/:schemeId', auth, async (req, res) => {
  try {
    const { schemeId } = req.params;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.savedSchemes = user.savedSchemes.filter((s) => s.schemeId !== schemeId);
    await user.save();

    res.json({ savedSchemes: user.savedSchemes });
  } catch (err) {
    console.error('Remove saved scheme error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/user/schemes/apply - add to applied schemes with status/date
router.post('/schemes/apply', auth, async (req, res) => {
  try {
    const { schemeId, name, link, status } = req.body;
    if (!schemeId || !name) return res.status(400).json({ message: 'schemeId and name required' });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const idx = user.appliedSchemes.findIndex((s) => s.schemeId === schemeId);
    if (idx === -1) {
      user.appliedSchemes.push({ schemeId, name, link, status: status || 'applied' });
    } else {
      user.appliedSchemes[idx].status = status || user.appliedSchemes[idx].status;
      user.appliedSchemes[idx].lastUpdatedAt = new Date();
    }
    await user.save();

    res.json({ appliedSchemes: user.appliedSchemes });
  } catch (err) {
    console.error('Apply scheme error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;