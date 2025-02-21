const router = require('express').Router();
const { sendFirebaseNotification,sendCanteenStatus } = require('../controllers/notificationController');

router.post('/send-notification', sendFirebaseNotification); // No need to handle res again


router.post('/send-canteen-status', sendCanteenStatus); // No need to handle res again

module.exports = router;
