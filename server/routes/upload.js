const router   = require('express').Router();
const ctrl     = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

router.post('/',                protect, ...ctrl.uploadFile);
router.post('/multiple',        protect, ...ctrl.uploadMultiple);
router.delete('/:publicId',     protect, ctrl.deleteFile);

module.exports = router;
