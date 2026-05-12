const router   = require('express').Router();
const ctrl     = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

// Public — form submissions
router.post('/', ctrl.create);

// Admin protected
router.get('/',              protect, ctrl.getAll);
router.get('/stats',         protect, ctrl.getStats);
router.get('/export',        protect, ctrl.exportCSV);
router.get('/:id',           protect, ctrl.getOne);
router.patch('/:id/status',  protect, ctrl.updateStatus);
router.delete('/:id',        protect, ctrl.remove);

module.exports = router;
