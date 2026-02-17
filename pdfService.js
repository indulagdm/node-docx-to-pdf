const { spawn } = require("child_process");
const path = require("path");
const { existsSync } = require("fs");

const getConvertorExe = () => {
  const locatedAt = path.join(__dirname, "./", "bin", "win32", "DocxToPdf.exe");

  if (existsSync(locatedAt)) {
    console.log("Path founded.", locatedAt);
  } else {
    console.log("Not found.");
  }

  return locatedAt;
};

const convertDocxToPdf = (inputDocxPath) => {
  return new Promise((resolve, reject) => {
    const outputPdfPath = inputDocxPath.replace(".docx", ".pdf");

    const python = spawn(getConvertorExe(), [inputDocxPath, outputPdfPath]);

    let result = "";
    let error = "";

    python.stdout.on("data", (data) => {
      result += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        reject(error);
      } else {
        resolve(result.trim());
      }
    });

    return outputPdfPath;
  });
};

module.exports = { convertDocxToPdf };
