const path = require("path");
const vision = require("@google-cloud/vision");

let client;

const getVisionClient = () => {
  if (client) {
    return client;
  }

  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!credentialsPath) {
    throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not set");
  }

  client = new vision.ImageAnnotatorClient({
    keyFilename: path.resolve(credentialsPath),
  });

  return client;
};

const performOcr = async ({ filePath }) => {
  if (!filePath) {
    throw new Error("filePath is required for OCR");
  }

  const visionClient = getVisionClient();
  const [result] = await visionClient.textDetection(filePath);
  const detections = result.textAnnotations || [];
  const text = detections[0]?.description?.trim() || "";

  return {
    provider: "google-vision",
    text,
  };
};

module.exports = {
  performOcr,
};
