const fs = require("fs");
const path = require("path");
const { logError } = require("../utils/logger");

module.exports.createDirIfNotExists = (dirPath) => {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {}
};

module.exports.createFile = (filePath, fileContent) => {
    try {
        const parentPath = path.dirname(filePath);
        if (!fs.existsSync(parentPath)) {
            fs.mkdirSync(parentPath, { recursive: true });
        }
        fs.writeFileSync(filePath, fileContent);
    } catch (error) {}
};

module.exports.readDir = (dirPath) => {
    try {
        return fs.readdirSync(dirPath);
    } catch (error) {}
};


module.exports.readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, "utf8");
    } catch (error) {}
}