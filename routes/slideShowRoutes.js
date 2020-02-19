const express = require('express');

const { upload, cloudinaryResizeAndUploadImage } = require('../utils/imageUploadUtils');

const slideShowController = require('../controllers/slideShowController');

const router = express.Router();

// router.param('id', listingController.checkID);

//https://stackoverflow.com/questions/40215527/file-upload-with-multer-that-contains-input-name-array

router.route('/')
    .get(slideShowController.getAllSlides)
    .post(upload.single('image'),
          cloudinaryResizeAndUploadImage, 
          slideShowController.createSlide);

router.route('/:id')
    .get(slideShowController.getSlide)
    .patch(upload.single('image'),
           cloudinaryResizeAndUploadImage,
           slideShowController.updateSlide)
    .delete(slideShowController.deleteSlide);

module.exports = router;