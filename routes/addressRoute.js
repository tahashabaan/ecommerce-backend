const express = require('express');

const authService = require('../services/authService');
const {addAdressToUser} = require('../services/addressService');

const router = express.Router();

router.use(authService.protect, authService.allowTo('user'));

router.route('/')
.get()
.post(addAdressToUser)
.delete()
.put()

module.exports = router;