var express = require('express');
var router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const entryCtrl = require('../controllers/entry');
const showCtrl = require('../controllers/show');

router.get('/', entryCtrl.index);
router.get('/new', entryCtrl.new);
router.post('/', upload.single('image'), entryCtrl.create);
router.get('/:id', showCtrl.show);
router.get('/:id/edit', entryCtrl.edit);
router.put('/:id', upload.single('image'), entryCtrl.update);
router.delete('/:id', entryCtrl.delete);


module.exports = router;