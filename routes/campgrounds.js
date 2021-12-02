const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');

const { storage} = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

// Grouping those routes having the same path "/" :
// router.get('/', catchAsync(campgrounds.index));
// router.post('/',isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// Grouping those routes having the same path "/id":
// router.get('/:id', catchAsync(campgrounds.showCampground));
// router.put('/:id',isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.editCampground));
// router.delete('/:id',isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;