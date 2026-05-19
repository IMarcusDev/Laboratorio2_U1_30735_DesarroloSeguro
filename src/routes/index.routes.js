const { Router } = require('express');
const { getIndex } = require('../controllers/index.controller');

const router = Router();

router.get('/', getIndex);

module.exports = router;
