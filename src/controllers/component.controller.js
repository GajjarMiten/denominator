const { throwIf } = require("../utils/error");
const { logError } = require("../utils/logger");
const FileService = require("../services/file.service");
const { getConfig } = require("../utils");
const { capitalize } = require("../utils/stringUtils");

const config = getConfig();

module.exports.createComponent = async (
    componentName,
    { extension, type } = {
        extension: config.extension,
        type: config.type,
    }
) => {
    try {
        throwIf((r) => !r, "Component name is required")(componentName);

        componentName = capitalize(componentName);

        const componentDir = config.dir;

        const files = FileService.readDir(config.templateDir);

        FileService.createDirIfNotExists(componentDir);

        for (let file of files) {
            let newFile = file;
            newFile = file.replace("{{Component}}", componentName);
            newFile = newFile.replace("ext", extension);

            const filePath = `${componentDir}/${componentName}/${newFile}`;

            const fileContent = FileService.readFile(
                `${config.templateDir}/${file}`
            );
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
