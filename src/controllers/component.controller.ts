import FileService from "services/file.service";
import { getConfig, capitalize, throwIf, logError } from "utils";
import type { Error } from "utils";

import path from "path";

const config = getConfig();

export const createComponent = async (
    componentName: string,
    extension: string,
    type: string = "component"
): Promise<void> => {
    try {
        throwIf((r: string) => !r, {
            message: "Component name is required",
        } as Error)(componentName);
        const templateDir = path.join(__dirname, "../templates/component");

        componentName = capitalize(componentName);

        extension = extension || config.extension;
        type = type || config.type;

        const componentDir = config.dir;

        const files = FileService.readDir(templateDir);

        FileService.createDirIfNotExists(componentDir);

        for (let file of files!) {
            let newFile = file;
            newFile = file.replace("{{Component}}", componentName);
            newFile = newFile.replace("ext", extension);

            const filePath = `${componentDir}/${componentName}/${newFile}`;

            const fileContent = FileService.readFile(`${templateDir}/${file}`);
            const newFileContent = fileContent!.replace(
                /{{Component}}/g,
                componentName
            );
            FileService.createFile(filePath, newFileContent);
        }
    } catch (error) {
        logError(error);
    }
};
