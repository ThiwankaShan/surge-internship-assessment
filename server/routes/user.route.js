const express = require('express');
const router= express.Router();
const controller = require('../controllers/user.controller');

router.get('/all', controller.getAll);

router.post('/create', controller.create);

router.get('/:id', controller.getByID);

router.delete('/:id', controller.delete);

router.patch('/:id', controller.update);

module.exports = router;