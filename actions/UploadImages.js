const fs = require("fs");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imagePath) => {
  try {
    const data = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
      folder: "image-converter",
    });

    return data.secure_url;
  } catch (error) {
    return error;
  }
};
module.exports = { uploadImage };
