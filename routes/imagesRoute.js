const { Router } = require("express");
const { upload } = require("../middleware/UploadImages");
const {
  compressImagesCTRL,
  convertImagesCTRL,
} = require("../controllers/imagesController");
const { ValiationParamaters } = require("../middleware/ValidationParameters");
const route = Router();

/**
 * @description Compress images
 * @access public
 * @router /api/images/compress
 * @method POST
 * */
route.post(
  "/compress",
  upload.single("image"),
  ValiationParamaters,
  compressImagesCTRL
);

/**
 * @description Convert images
 * @access public
 * @router /api/images/convert
 * @method POST
 * */
route.post(
  "/convert",
  upload.single("image"),
  ValiationParamaters,
  convertImagesCTRL
);

module.exports = route;
