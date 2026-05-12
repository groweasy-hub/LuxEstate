const router = require('express').Router();
const { login, logout, me, register } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login',    login);
router.post('/logout',   logout);
router.get('/me',        protect, me);

module.exports = router;
