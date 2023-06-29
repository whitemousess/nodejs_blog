const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.post('/search/course', siteController.searchCourse);
router.get('/', siteController.index);

module.exports = router;
