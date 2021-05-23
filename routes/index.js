const express = require('express');
const router = express.Router();
const searchappController = require('../controllers/sappController');

router.get('/SearchApp',searchappController.getApp);
router.get('/SearchApp/:id', searchappController.getApp);

module.exports = router;