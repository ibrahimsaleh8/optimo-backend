const sharp = require("sharp");

const imgConverter = async (buffer, quality, extension) => {
  let out;

  switch (extension) {
    case "jpg":
    case "jpeg":
      out = await sharp(buffer).jpeg({ quality }).toBuffer();
      break;

    case "webp":
      out = await sharp(buffer).webp({ quality }).toBuffer();
      break;

    case "png":
      out = await sharp(buffer)
        .png({
          compressionLevel: Math.round((100 - quality) / 10),
          palette: true,
          quality,
        })
        .toBuffer();
      break;

    case "avif":
      out = await sharp(buffer).avif({ quality }).toBuffer();
      break;

    case "gif":
      out = await sharp(buffer).gif().toBuffer();
      break;

    default:
      out = await sharp(buffer).jpeg({ quality }).toBuffer();
      break;
  }

  return out;
};

module.exports = { imgConverter };
