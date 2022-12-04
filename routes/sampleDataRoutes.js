const express = require('express');
const sampleDataController = require('../controllers/sampleDataController');

const router = express.Router();

router
  .route('/')
  .get(sampleDataController.getAllData)
  .post(sampleDataController.createData);
router
  .route('/:id')
  .get(sampleDataController.getData)
  .patch(sampleDataController.updateData)
  .delete(sampleDataController.deleteData);

module.exports = router;
