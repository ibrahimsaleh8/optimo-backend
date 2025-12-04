const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const outputFolder = path.join(__dirname, "../images-output");

const imgConverter = async (image, quality, extension) => {
  const { name } = path.parse(image.filename);
  const inputBuffer = await fs.promises.readFile(image.path);

  const outputPath = path.join(outputFolder, `${name}.${extension}`);
  let out;
  switch (extension) {
    case "jpg":
    case "jpeg":
      out = await sharp(inputBuffer).jpeg({ quality }).toFile(outputPath);
      break;

    case "webp":
      out = await sharp(inputBuffer).webp({ quality }).toFile(outputPath);
      break;

    case "png":
      out = await sharp(inputBuffer)
        .png({ compressionLevel: 9, palette: true, quality })
        .toFile(outputPath);
      break;

    case "avif":
      out = await sharp(inputBuffer).avif({ quality }).toFile(outputPath);
      break;

    case "gif":
      out = await sharp(inputBuffer).gif().toFile(outputPath);
      break;

    default:
      out = await sharp(inputBuffer).jpeg({ quality }).toFile(outputPath);
      break;
  }

  return {
    fileName: `${name}.${extension}`,
    size: out.size,
  };
};

module.exports = { imgConverter };
