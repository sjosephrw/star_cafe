const Menu = require('../models/menuModel');

//controllers
const factory = require('./handlerFactory');

exports.getAllMenus = factory.getAll(Menu);

exports.createMenu = factory.createOne(Menu);

exports.getMenu = factory.getOne(Menu);

exports.updateMenu = factory.updateOne(Menu);

exports.deleteMenu = factory.deleteOne(Menu);
