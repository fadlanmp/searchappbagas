const express = require('express');
const router = express.Router();
const searchappController = require('../controllers/sappController');

router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        data: 'SearchApp jalan'
    })
})

router.get('/SearchApp',searchappController.getApp)
router.get('/SearchApp/:id', searchappController.getApp)
// router.get('/platform', searchappController.getPlatform)
router.get('/appByPlatform', searchappController.getAppByPlatform)

module.exports = router;