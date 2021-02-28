const express = require('express');
const leadsController = require('./../controllers/leadsController');

const router = express.Router();

router
  .route('/')
  .get(leadsController.getAllLeads)
  .post(leadsController.createLead);

router
  .route('/:id')
  .get(leadsController.getLead)
  .patch(leadsController.updateLead)
  .delete(leadsController.deleteLead);

module.exports = router;