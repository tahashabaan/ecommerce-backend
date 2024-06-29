const express = require('express');
const {createCashOrder,checkoutSession,  filterOrderForLoggedUser,findAllOrders,findOneOrder, updateOrderToPaid, updateOrderToDelivered } = require('../services/orderService')

const authService =  require('../services/authService')

const router = express.Router();
 
router.use(authService.protect)

router.get(
  '/checkout-session/:cartId',
  authService.allowTo('user'),
  checkoutSession
);

router
.route('/:cartId')
.post(authService.allowedTo('user'), 
       createCashOrder);

router.get(
  '/',
  authService.allowedTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);

router.get(
  '/:id',
  findOneOrder
);

router.put(
  '/:id/pay',
  authService.allowedTo('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  authService.allowedTo('admin', 'manager'),
  updateOrderToDelivered
);





// cash , card, admin show all iorders, user can gweorder b
// checckouseession
// webhooks creaordere  sripe acoun
// router.route('/:id')
// .get(getCuponModalById)
// .put(updataCuponModalById)
// .delete(delCuponModalById)

module.exports = router;