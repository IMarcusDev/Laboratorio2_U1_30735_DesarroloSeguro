const { Router } = require('express');
const { getAll, getById, create, update } = require('../controllers/hoteles.controller');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);

module.exports = router;
