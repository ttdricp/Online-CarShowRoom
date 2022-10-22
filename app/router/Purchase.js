const express = require('express')
const PurchaseController = require('../controllers/purchase')
const router = express.Router();
router.get('/results', PurchaseController.findAll);
router.get('/purchase/:id', PurchaseController.findOne);
router.post('/', PurchaseController.create);
router.patch('/purchase/:id', PurchaseController.update);
router.delete('/purchase/:id', PurchaseController.destroy);
module.exports = router