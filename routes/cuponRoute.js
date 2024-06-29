const express = require('express');
const {createCuponModal,
       getCuponModal,
       getCuponModalById,
       updataCuponModalById,
       delCuponModalById} = require('../services/couponService')

const authService =  require('../services/authService')

const router = express.Router();
 
router.use(authService.protect, authService.allowTo('mange', 'admin'))
router.route('/')
.get(getCuponModal)
.post(createCuponModal)

router.route('/:id')
.get(getCuponModalById)
.put(updataCuponModalById)
.delete(delCuponModalById)

module.exports = router;


