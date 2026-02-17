const { convertDocxToPdf } = require("./pdfService.js");
const path = require("path");
const { existsSync } = require("fs");

const filePath = path.join("");

if (existsSync(filePath)) {
  console.log("Path founded.", filePath);
} else {
  console.log("Not found.");
}

convertDocxToPdf(filePath);
