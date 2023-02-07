const express = require('express');
const { param } = require('express-validator');
const sponsorsController = require('../../controllers/sponsors');

const router = express.Router();
const { ValidateSponsor } = require('../../validators/sponsors');
const { validator } = require('../../middlewares/validate');

router.route('/').get(sponsorsController.getAllSponsors);
router.route('/search').get(sponsorsController.getSponsorById);
router
  .route('/:id')
  .get(param('id').isMongoId(), validator, sponsorsController.getSponsorById);
router.route('/').post(ValidateSponsor, sponsorsController.createSponsor);
router
  .route('/:id')
  .delete(param('id').isMongoId(), validator, sponsorsController.deleteSponsor);
router
  .route('/:id')
  .put(
    param('id').isMongoId(),
    ValidateSponsor,
    sponsorsController.updateSponsor,
  );

module.exports = router;
