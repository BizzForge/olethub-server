const {Router} = require('express');
const controller = require('./controller')

const router = Router();
router.get('/', controller.getUsers);
router.post('/', controller.addUser)
router.post('/subscribe', controller.addSubscribers);
router.get('/:id', controller.getUserById);

module.exports = router;