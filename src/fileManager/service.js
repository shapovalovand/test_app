/* eslint-disable consistent-return */
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: './fileStorage',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error('Please upload a Image'));
    }
    cb(undefined, true);
  }
});

router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
  res.send(req.file);
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

router.post('/uploadBulkImage', imageUpload.array('images', 4), (req, res) => {
  res.send(req.files);
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

const videoStorage = multer.diskStorage({
  destination: 'videos',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4)$/)) {
      return cb(new Error('Please upload a Video'));
    }
    cb(undefined, true);
  }
});

router.post('/uploadVideo', videoUpload.single('video'), (req, res) => {
  res.send(req.file);
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

module.exports = router;
