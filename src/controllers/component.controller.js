const { throwIf } = require("../utils/error");
const { logError } = require("../utils/logger");
const FileService = require("../services/file.service");
const { getConfig } = require("../utils");
const { capitalize } = require("../utils/stringUtils");

const path = require("path");

const config = getConfig();

module.exports.createComponent = async (componentName, extension, type) => {
    try {
        throwIf((r) => !r, "Component name is required")(componentName);
        const templateDir = path.join(__dirname, "../templates/component");

        componentName = capitalize(componentName);

        extension = extension || config.extension;
        type = type || config.type;

        const componentDir = config.dir;

        const files = FileService.readDir(templateDir);
        FileService.createDirIfNotExists(componentDir);
        for (let file of files) {
            let newFile = file;
            newFile = file.replace("{{Component}}", componentName);
            newFile = newFile.replace("ext", extension);

            const filePath = `${componentDir}/${componentName}/${newFile}`;

            const fileContent = FileService.readFile(`${templateDir}/${file}`);
            const newFileContent = fileContent.replace(
                /{{Component}}/g,
                componentName
            );
            FileService.createFile(filePath, newFileContent);
        }
    } catch (error) {
        logError(error);
    }
};
