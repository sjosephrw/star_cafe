const express = require('express');

const menuController = require('../controllers/menuController');

const router = express.Router();

// router.param('id', listingController.checkID);

//https://stackoverflow.com/questions/40215527/file-upload-with-multer-that-contains-input-name-array

router.route('/')
    .get(menuController.getAllMenus)
    .post(menuController.createMenu);

router.route('/:id')
    .get(menuController.getMenu)
    .patch(menuController.updateMenu)
    .delete(menuController.deleteMenu);

router.route('/:id/category/')
    .get(menuController.getAllMenus)
    .post(menuController.createMenu);

router.route('/:id/category/:categoryId')
    .get(menuController.getMenu)
    .patch(menuController.updateMenu)
    .delete(menuController.deleteMenu);    

module.exports = router;