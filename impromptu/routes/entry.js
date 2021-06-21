var express = require('express');
var router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const entryCtrl = require('../controllers/entry');

router.get('/', entryCtrl.index);
router.get('/new', entryCtrl.new);
router.post('/', upload.single('image'), entryCtrl.create);
router.get('/:id', entryCtrl.show);
router.get('/:id/edit', entryCtrl.edit);
router.put('/:id', entryCtrl.update);
router.delete('/:id', entryCtrl.delete);


module.exports = router;