const asyncHandler = require("express-async-handler");
const path = require("path");
const { imgConverter } = require("../actions/imageConverter");
const { uploadImage } = require("../actions/UploadImages");
const {
  DeleteImagesFromServer,
} = require("../actions/DeleteImagesAfterProccess");

const compressImagesCTRL = asyncHandler(async (req, res) => {
  const images = req.files;
  const data = JSON.parse(req.body.data || "[]");
  const dataMap = new Map(data.map((img) => [img.name, img]));

  try {
    const compressedFiles = await Promise.all(
      images.map(async (image) => {
        const imageData = dataMap.get(image.originalname);
        if (!imageData)
          throw new Error(`Settings not found for ${image.originalname}`);

        const compressedImage = await imgConverter(
          image,
          +imageData.quality ?? 60,
          imageData.name.split(".").pop().toLowerCase()
        );
        await DeleteImagesFromServer(
          path.join(__dirname, `../images/${compressedImage.fileName}`)
        );

        const url = await uploadImage(
          path.join(__dirname, `../images-output/${compressedImage.fileName}`)
        );

        await DeleteImagesFromServer(
          path.join(__dirname, `../images-output/${compressedImage.fileName}`)
        );

        if (url.error)
          throw new Error(`Upload failed for ${image.originalname}`);

        return {
          name: image.originalname,
          downloadLink: url,
          size: compressedImage.size,
        };
      })
    );

    res.status(200).json({ images: compressedFiles });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

const convertImagesCTRL = asyncHandler(async (req, res) => {
  const images = req.files;
  const data = JSON.parse(req.body.data || "[]");
  const dataMap = new Map(data.map((img) => [img.name, img]));

  try {
    const convertedFiles = await Promise.all(
      images.map(async (image) => {
        const imageData = dataMap.get(image.originalname);
        if (!imageData)
          throw new Error(`Settings not found for ${image.originalname}`);

        const convertedImage = await imgConverter(
          image,
          imageData.quality ?? 100,
          imageData.convertTo ?? "png"
        );

        await DeleteImagesFromServer(
          path.join(__dirname, `../images/${image.filename}`)
        );

        const url = await uploadImage(
          path.join(__dirname, `../images-output/${convertedImage.fileName}`)
        );

        await DeleteImagesFromServer(
          path.join(__dirname, `../images-output/${convertedImage.fileName}`)
        );
        if (url.error)
          throw new Error(`Upload failed for ${image.originalname}`);

        return {
          name: image.originalname,
          downloadLink: url,
          size: convertedImage.size,
        };
      })
    );

    res.status(200).json({ images: convertedFiles });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = {
  compressImagesCTRL,
  convertImagesCTRL,
};
