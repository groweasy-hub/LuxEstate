const router   = require('express').Router();
const ctrl     = require('../controllers/offerController');
const { protect } = require('../middleware/auth');

// Public
router.get('/',          ctrl.getAll);
router.get('/featured',  ctrl.getFeatured);
router.get('/:id',       ctrl.getOne);

// Admin protected
router.post('/',         protect, ctrl.create);
router.put('/:id',       protect, ctrl.update);
router.delete('/:id',    protect, ctrl.remove);

module.exports = router;
