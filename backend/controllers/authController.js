// backend/controllers/authController.js

// @desc    Sync Firebase user with MongoDB
// @route   POST /api/auth/sync
// @access  Private
export const syncUser = async (req, res) => {
  res.status(200).json(req.user);
};

// @desc    Get logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};
