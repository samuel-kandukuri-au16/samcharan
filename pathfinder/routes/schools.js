const express = require('express');
const router = express.Router();
const schools = require('../controllers/schools');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin, validateSchool } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const School = require('../models/school');

router.route('/')
    .get(catchAsync(schools.index))
    .post(isLoggedIn, upload.array('image'), validateSchool, catchAsync(schools.createSchool));


router.get('/new', isLoggedIn, schools.renderNewForm);
router.get('/admin',schools.renderadminForm);

router.route('/:id')
    .get(catchAsync(schools.showSchool))
    .put(isLoggedIn, isAdmin, upload.array('image'), validateSchool, catchAsync(schools.updateSchool))
    .delete(isLoggedIn, isAdmin, catchAsync(schools.deleteSchool));

router.get('/:id/edit', isLoggedIn, isAdmin, catchAsync(schools.renderEditForm));



module.exports = router;