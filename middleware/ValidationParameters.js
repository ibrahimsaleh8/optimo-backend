const ValiationParamaters = (req, res, next) => {
  const images = req.files;

  if (!images || images.length === 0) {
    return res.status(400).json({ message: "No images uploaded" });
  }

  let data;
  try {
    data = JSON.parse(req.body.data);
  } catch (err) {
    return res.status(400).json({ message: "Invalid JSON in data field" });
  }

  if (!data) {
    return res.status(400).json({ message: "Images data are required" });
  }

  next();
};

module.exports = {
  ValiationParamaters,
};
