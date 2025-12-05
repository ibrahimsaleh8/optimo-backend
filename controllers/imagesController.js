const asyncHandler = require("express-async-handler");
const { imgConverter } = require("../actions/imageConverter");
const { uploadImage } = require("../actions/UploadImages");

const compressImagesCTRL = asyncHandler(async (req, res) => {
  const image = req.file.buffer;
  const data = JSON.parse(req.body.data); // {quality,name}

  const compressedImageBuffer = await imgConverter(
    image,
    Number(data.quality) || 60,
    data.name.split(".").pop().toLowerCase()
  );
  console.log("compressedImageBuffer ", compressedImageBuffer);
  const uploadedImage = await uploadImage(compressedImageBuffer);
  console.log("uploadedImage ", uploadedImage);
  return res.status(200).json({
    name: data.name,
    downloadLink: uploadedImage.secure_url,
    size: uploadedImage.bytes,
  });
});

const convertImagesCTRL = asyncHandler(async (req, res) => {
  const image = req.file.buffer;
  const data = JSON.parse(req.body.data); // {quality,name,convertTo}

  const convertedImageBuffer = await imgConverter(
    image,
    Number(data.quality) || 100,
    data.convertTo ?? "png"
  );

  const uploadedImage = await uploadImage(convertedImageBuffer);

  return res.status(200).json({
    name: data.name,
    downloadLink: uploadedImage.secure_url,
    size: uploadedImage.bytes,
  });
});

module.exports = {
  compressImagesCTRL,
  convertImagesCTRL,
};
