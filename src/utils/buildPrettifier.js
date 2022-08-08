const fs = require("fs");
const path = require("path");

const prettier = require("prettier");


module.exports.buildPrettifier = (prettierConfig) => {
    let config = prettierConfig;

    if (!config) {
        const currentPath = process.cwd();

        try {
            config = fs.readFileSync(path.join(currentPath, "/.prettierrc"), {
                encoding: "utf8",
                flag: "r",
            });
        } catch (err) {
            // No big deal, they don't have a prettier config
        }

        if (config) {
            try {
                config = JSON.parse(config);
            } catch (err) {
                console.error(
                    "Count not parse .prettierrc, does not appear to be JSON"
                );
            }
        }
    }

    return (text) => {
        return prettier.format(text, config);
    };
};
