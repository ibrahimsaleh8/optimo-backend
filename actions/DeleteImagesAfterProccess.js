const fs = require("fs");

const DeleteImagesFromServer = async (imagePath) => {
  try {
    await fs.promises.unlink(imagePath);
  } catch (error) {
    console.log("Error in delete image", error);
    throw new Error(error);
  }
};

module.exports = {
  DeleteImagesFromServer,
};
