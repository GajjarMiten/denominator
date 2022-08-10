const os = require("os");

const CONFIG_NAME = "denominator.config.json";

const requireOptional = (filePath) => {
    try {
        return require(filePath);
    } catch (e) {
        if (e.code !== "MODULE_NOT_FOUND") {
            throw e;
        }
    }
};

module.exports.getConfig = () => {
    const home = os.homedir();
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
    };

    return config;
};
