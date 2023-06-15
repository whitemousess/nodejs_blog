const express = require('express');
const router = express.Router();

const CourseController = require('../app/controllers/CourseController');

router.get('/create', CourseController.create);
router.post('/store', CourseController.store);
router.get('/:id/edit', CourseController.edit);
router.post('/handle-form-actions',CourseController.HandleFormActions);
router.put('/:id', CourseController.update);
router.delete('/:id', CourseController.destroy);
router.delete('/:id/force', CourseController.forceDestroy);
router.patch('/:id/restore', CourseController.restore);
router.get('/:slug', CourseController.show);

module.exports = router;
