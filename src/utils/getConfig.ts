import { homedir } from "os";

const CONFIG_NAME = "denominator.config.json";

const requireOptional = (filePath: string) => {
    try {
        return require(filePath);
    } catch (e: any) {
        if (e.code !== "MODULE_NOT_FOUND") {
            throw e;
        }
    }
};

export function getConfig() {
    const home = homedir();
    const pwd = process.cwd();

    const defaults = {
        type: "functional",
        dir: "src/components",
        extension: "js",
    };

    const globalOverrides = requireOptional(`${home}\\${CONFIG_NAME}`);

    const localOverrides = requireOptional(`${pwd}\\${CONFIG_NAME}`);

    const config = {
        ...defaults,
        ...globalOverrides,
        ...localOverrides,
    } as const;

    return config;
}

export default {
    getConfig,
};
