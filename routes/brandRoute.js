const express = require('express');
const {
      createBrandModal, 
      getBrandModal, 
      getBrandModalById, 
      updataBrandModalById,
      delBrandModalById, 
      uploadBrandIamge,
      filterImageBrand
     } = require('../services/brandService');

const {
     getBrandValidated,
     createBrandValidated 
     } = require('../utilis/validated/brandValidator');     

const authService = require('../services/authService')

const router = express.Router();


router.route('/')
   .get(getBrandModal)
   .post( 
     authService.protect,
     authService.allowTo('mange', 'admin'),
     uploadBrandIamge,
     filterImageBrand,
     createBrandValidated,
     createBrandModal);
     
router.route('/:id')
.get(getBrandValidated,   getBrandModalById)
.put(
     authService.protect,
     authService.allowTo('mange', 'admin'),
     uploadBrandIamge,
     filterImageBrand,
     getBrandValidated,   
     updataBrandModalById)
.delete(
     authService.protect,
     authService.allowTo('admin'),
     getBrandValidated, 
     delBrandModalById);

module.exports = router;