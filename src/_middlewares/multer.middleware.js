const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

// Filter files with multer
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Not an image! Please upload only images.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images/uploads');
  },
  filename: (req, file, callback) => {
    // const name = file.originalname.split(' ').join('_')
    const name = `bienfafood-${Date.now()}`;
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + '.' + extension);
  },
});

module.exports = {
  multer: multer({ storage: storage, fileFilter: multerFilter }).single(
    'image'
  ),
  multerArray: multer({
    storage: storage,
    fileFilter: multerFilter,
  }).array('autresImages', 8),
};
