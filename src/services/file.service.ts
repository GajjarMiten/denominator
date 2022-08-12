import fs from "fs";
import path from "path";
import { throwIf, Error, throwError } from "utils";

export const createDirIfNotExists = (dirPath: string) => {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {}
};

export const createFile = (filePath: string, fileContent: string) => {
    try {
        const parentPath = path.dirname(filePath);
        if (!fs.existsSync(parentPath)) {
            fs.mkdirSync(parentPath, { recursive: true });
        }
        fs.writeFileSync(filePath, fileContent);
    } catch (error) {}
};

export const readDir = (dirPath: fs.PathLike): string[] | undefined => {
    try {
        const files = fs.readdirSync(dirPath, "utf8");
        throwIf((r: string[]) => !r, {
            message: "No files found in template directory",
        } as Error)(files);

        return files;
    } catch (error) {
        throwError({} as Error)(error);
    }
};

export const readFile = (filePath: string): string | undefined => {
    try {
        const file = fs.readFileSync(filePath, "utf8");

        throwIf((r: string) => !r, {
            message: "No file found at path",
        } as Error)(file);

        return file;
    } catch (error) {
        throwError({} as Error)(error);
    }
};

export default {
    createDirIfNotExists,
    createFile,
    readDir,
    readFile,
} as const;
